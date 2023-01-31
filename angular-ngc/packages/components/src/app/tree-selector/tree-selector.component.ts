import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  OnChanges,
  Input,
  Output,
  ViewEncapsulation,
  DoCheck,
  IterableDiffers,
} from '@angular/core';
import { Tree, TreeOptions } from './tree.model';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'tree-selector',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tree-selector.component.scss'],
  template: `
    <div [formGroup]="form">
      <label for="search" id="label">
        {{ label }}
        <span *ngIf="required" class="required" aria-hidden="true"></span>
      </label>
      <div *ngIf="description">{{ description }}</div>
      <mat-form-field appearance="outline" class="full-width">
        <input
          [required]="required"
          id="search"
          type="text"
          matInput
          formControlName="selectedItem"
          [matAutocomplete]="auto"
          (keypress)="initializeFilter()"
        />
        <mat-icon matSuffix>arrow_drop_down</mat-icon>
        <mat-autocomplete
          autoActiveFirstOption
          #auto="matAutocomplete"
          class="nested-autocomplete"
          [displayWith]="getDisplayText"
          (optionSelected)="selectItem($event)"
          (closed)="checkValidItem()"
        >
          <mat-option
            *ngFor="let item of items; trackBy: trackById"
            [value]="item"
            [ngClass]="{ 'multi-root-tree': showDepthAtRoot }"
            class="select-depth-option"
            [title]="getDisplayText(item)"
          >
            <div
              class="select-depth-guide"
              *ngFor="let n of getDepthArray(item)"
            ></div>
            <div class="font-size-smaller select-depth-content">
              {{ getDisplayText(item) }}
            </div>
          </mat-option>
        </mat-autocomplete>
        <mat-error>You must make a selection</mat-error>
      </mat-form-field>
    </div>
  `,
})
export class TreeSelectorComponent
  implements OnInit, OnDestroy, DoCheck, OnChanges {
  @Input() treeOptions: TreeOptions;
  @Input() label: string;
  @Input() description: string;
  @Input() required = false;
  @Input() data: Array<any> = [];
  @Input() value: any;
  @Output() formChange = new EventEmitter<{
    itemId: string;
    itemName: string;
    isValid: boolean;
    childCount: number;
  }>();

  differ: any;
  items: Array<Tree> = [];
  searchChange$ = new BehaviorSubject<string>('');
  selectedItem: any;
  form: FormGroup;
  showDepthAtRoot = false;

  private tree: Tree = NOT_FOUND_TREE;
  private searchSubscription: Subscription;

  constructor(private fb: FormBuilder, differs: IterableDiffers) {
    this.differ = differs.find([]).create(null);
  }

  ngOnInit() {
    this.form = this.fb.group({
      selectedItem: [
        this.selectedItem || null,
        this.required ? Validators.required : null,
      ],
    });

    this.form.get('selectedItem').valueChanges.subscribe(value => {
      value = value || '';
      this.searchChange$.next(value.toString());
    });
  }

  ngDoCheck() {
    if (this.data && this.differ.diff(this.data)) {
      this.onData(this.data, this.treeOptions);
      this.setByValue();
      this.sendFormInfo();
    }
  }

  ngOnChanges(changes) {
    if (this.value && this.form && changes.value) {
      this.setByValue();
    }
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  initializeFilter(): void {
    if (!this.searchSubscription) {
      this.searchSubscription = this.searchChange$
        .pipe(
          switchMap((searchText: string) => of(this.search(searchText))),
          catchError(err => {
            console.error('Error filtering items', err);
            return of(NOT_FOUND_TREE.flatten());
          })
        )
        .subscribe((items: Array<Tree>) => {
          this.items = items;
        });
    }
  }

  setByValue(): void {
    if (this.value && this.value.id !== undefined) {
      this.selectedItem = this.items.find(
        item => item.data.id === this.value.id
      );

      if (this.selectedItem) {
        this.form.setValue({ selectedItem: this.selectedItem });
      }
    } else {
      this.selectedItem = null;
    }
  }

  checkValidItem(): void {
    if (
      !this.form.get('selectedItem').value ||
      typeof this.form.get('selectedItem').value === 'string' ||
      this.form.get('selectedItem').value.data.id === 0
    ) {
      this.selectedItem = undefined;
      this.form.patchValue({
        selectedItem: undefined,
      });
      this.sendFormInfo();
    }
  }

  getDepthArray(item): Array<any> {
    return Array(item.depth);
  }

  getDisplayText(option: any): string {
    const name = option && option.options.nameKey;
    return option && option.data && option.data[name] ? option.data[name] : '';
  }

  selectItem(selectedOption: MatAutocompleteSelectedEvent): void {
    this.selectedItem = selectedOption.option.value;
    this.sendFormInfo();
  }

  trackById(index: number, obj: Tree): number {
    return obj.data.id;
  }

  private getNewRoot(data: any, options: TreeOptions): object {
    const childKeys = options.childrenKey.split('.');

    const node = this.setChildrenWithKeys(childKeys, data);
    node.id = 'root';
    node.name = 'Root';

    let rootNode = {};
    if (options.dataKey) {
      rootNode[options.dataKey] = node;
    } else {
      rootNode = node;
    }

    return rootNode;
  }

  private setChildrenWithKeys(keys: Array<string>, childData: any): any {
    const node = {};
    if (keys.length > 1) {
      node[keys[0]] = this.setChildrenWithKeys(keys.slice(1), childData);
    } else {
      node[keys[0]] = childData;
    }

    return node;
  }

  private onData(data: any, options: TreeOptions): void {
    if (data && data.length > 0) {
      if (data.length > 1) {
        const rootObj = this.getNewRoot(data, options);
        this.tree = new Tree(rootObj, options, 0, true);
        this.showDepthAtRoot = true;
      } else {
        this.tree = new Tree(data[0], options, 0);
        this.showDepthAtRoot = false;
      }
      this.items = this.tree.flatten();
    } else {
      this.tree = NOT_FOUND_TREE;
      this.items = this.tree.flatten();
    }
  }

  private search(searchText: string): Array<Tree> {
    searchText = searchText.trim();

    this.tree.filter(searchText);
    const items = this.tree.flatten(searchText.length > 0);

    return items.length > 0 ? items : NOT_FOUND_TREE.flatten();
  }

  public sendFormInfo(): void {
    this.formChange.emit({
      itemId: this.selectedItem ? this.selectedItem.data.id : undefined,
      itemName: this.selectedItem ? this.selectedItem.data.name : undefined,
      isValid: this.form.valid,
      childCount: this.selectedItem ? this.selectedItem.childCount : 0,
    });
  }
}

const NOT_FOUND_TREE = new Tree(
  {
    id: 0,
    name: 'No institutions found',
    children: [],
  },
  { nameKey: 'name', childrenKey: 'children' },
  0
);
