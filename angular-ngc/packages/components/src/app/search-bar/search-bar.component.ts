import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'intf-search-bar',
  styleUrls: ['./search-bar.component.scss'],
  template: `
    <form class="search-bar search-bar-container" (submit)="submitSearch()">
      <mat-form-field
        class="search-form-field"
        appearance="outline"
        [floatLabel]="alwaysShowPlaceholder ? 'always' : 'auto'"
      >
        <mat-label aria-label="search"></mat-label>
        <input
          #inputElement
          matInput
          [(ngModel)]="searchText"
          [placeholder]="placeholder"
          type="search"
          name="searchText"
          aria-label="search"
        />
        <button
          mat-button
          type="button"
          *ngIf="searchText"
          matSuffix
          mat-icon-button
          aria-label="Clear Search"
          (click)="clear()"
          class="search-clear-btn"
        >
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>
      <button
        mat-flat-button
        type="submit"
        color="primary"
        matSuffix
        aria-label="Search"
        class="search-btn"
      >
        <mat-icon>search</mat-icon>
      </button>
    </form>
  `,
})
export class SearchBarComponent {
  @Input() placeholder: string;
  @Input() alwaysShowPlaceholder: boolean = false;
  @Output() searchChange = new EventEmitter<{ searchText: string }>();
  @Output() clearSearch = new EventEmitter<{ searchText: string }>();
  @ViewChild('inputElement', { static: true }) input: ElementRef;
  searchText = '';

  submitSearch() {
    this.searchChange.next({ searchText: this.searchText });
  }

  clear() {
    this.searchText = '';
    this.clearSearch.next({ searchText: this.searchText });
  }

  clearAndFocus() {
    this.searchText = '';
    this.input.nativeElement.focus();
  }
}
