import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { pipe, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'axiom-bottom-bar',
  styleUrls: ['./bottom-bar.component.scss'],
  template: `
    <div class="pagination-layout">
      <ng-container *ngIf="getPaginationSize() > 7">
        <div class="go-to-page m-r-large">
          <label class="go-to-label m-b-none m-r-small" for="goToPage">
            Go to Page
          </label>

          <input
            [ngModel]="goToPage"
            (ngModelChange)="jumpToPage.next($event)"
            class="go-to-input p-smaller"
            id="goToPage"
            type="text"
            aria-label="go to page"
          />
        </div>
      </ng-container>

      <button
        *ngIf="currentIndex !== 1; else hiddenBackArrow"
        (click)="goToPreviousPage.next()"
        id="prev-arrow"
        mat-icon-button
        color="primary"
        aria-label="Paginate left"
      >
        <mat-icon>keyboard_arrow_left</mat-icon>
      </button>
      <ng-template #hiddenBackArrow>
        <span class="hidden-arrow"></span>
      </ng-template>

      <ng-container *ngIf="getPaginationSize() > 7; else simplePagination">
        <!-- first three elements -->
        <ng-container *ngFor="let page of firstThreePages">
          <button
            *ngIf="
              currentIndex < 4 || currentIndex > pages.length - 3 || page === 1
            "
            [class.active-index]="isActiveButton(page)"
            [disabled]="isActiveButton(page)"
            (click)="paginateToPage(page)"
            class="pagination-button"
            id="first-page-buttons"
            mat-icon-button
            color="primary"
            attr.aria-label="Paginate to page {{ page }}"
          >
            {{ page }}
          </button>
        </ng-container>

        <small
          *ngIf="currentIndex > 3 && currentIndex < pages.length - 2"
          class="pagination-ellipsis"
        >
          ...
        </small>

        <!-- middle elements-->
        <ng-container
          *ngIf="
            currentIndex > 3 && currentIndex < pages.length - 2;
            else middleEllipsis
          "
        >
          <button
            *ngFor="let page of navgiateMiddlePages()"
            [class.active-index]="isActiveButton(page)"
            [disabled]="isActiveButton(page)"
            (click)="paginateToPage(page)"
            class="pagination-button"
            id="first-page-buttons"
            mat-icon-button
            color="primary"
            attr.aria-label="Paginate to page {{ page }}"
          >
            {{ page }}
          </button>
        </ng-container>
        <ng-template #middleEllipsis>
          <small class="pagination-ellipsis">
            ...
          </small>
        </ng-template>

        <small
          *ngIf="currentIndex > 3 && currentIndex < pages.length - 2"
          class="pagination-ellipsis"
        >
          ...
        </small>

        <!-- last three elements -->
        <ng-container *ngFor="let page of lastThreePages">
          <button
            *ngIf="
              currentIndex < 4 ||
              currentIndex > pages.length - 3 ||
              page === pages.length
            "
            [class.active-index]="isActiveButton(page)"
            [disabled]="isActiveButton(page)"
            (click)="paginateToPage(page)"
            class="pagination-button"
            id="last-page-buttons"
            mat-icon-button
            color="primary"
            attr.aria-label="Paginate to page {{ page }}"
          >
            {{ page }}
          </button>
        </ng-container>
      </ng-container>
      <ng-template #simplePagination>
        <button
          *ngFor="let page of pages"
          [class.active-index]="isActiveButton(page)"
          [disabled]="isActiveButton(page)"
          (click)="paginateToPage(page)"
          class="pagination-button"
          id="page-button"
          mat-icon-button
          color="primary"
          attr.aria-label="Paginate to page {{ page }}"
        >
          {{ page }}
        </button>
      </ng-template>
      <button
        *ngIf="!isAtLastIndex(); else hiddenForwardArrow"
        (click)="goToNextPage.next()"
        id="next-arrow"
        mat-icon-button
        color="primary"
        aria-label="Paginate right"
      >
        <mat-icon>keyboard_arrow_right</mat-icon>
      </button>
      <ng-template #hiddenForwardArrow>
        <span class="hidden-arrow"></span>
      </ng-template>
    </div>
  `,
})
export class BottomBarComponent implements OnInit, OnChanges, OnDestroy {
  @Input() pageIndex = 0;
  @Input() pageSize = 50;
  @Input() length: number;
  @Output() paginationChange = new EventEmitter<{
    pageIndex: number;
    pageSize: number;
  }>();
  pages: Array<number>;
  firstThreePages: Array<number>;
  middlePages: Array<number>;
  lastThreePages: Array<number>;
  currentIndex = 1;
  goToPage: number;
  jumpToPage = new Subject<string>();
  goToNextPage = new Subject<void>();
  goToPreviousPage = new Subject<void>();

  ngOnInit() {
    const { updatePageButtons, debouncePaginate } = this;
    updatePageButtons();
    this.jumpToPage
      .pipe(
        debounceTime(500),
        map(value => {
          if (!value) {
            return;
          }
          const index = parseInt(value, 0);
          this.paginateToPage(index);
        })
      )
      .subscribe();
    this.goToNextPage
      .pipe(
        map(() => (this.currentIndex += 1)),
        debouncePaginate()
      )
      .subscribe();
    this.goToPreviousPage
      .pipe(
        map(() => (this.currentIndex -= 1)),
        debouncePaginate()
      )
      .subscribe();
  }

  debouncePaginate = () => {
    return pipe(
      debounceTime(300),
      map(() => this.updatePagination())
    );
  };

  ngOnChanges(changes: SimpleChanges) {
    const pageIndexChanged =
      changes.pageIndex &&
      changes.pageIndex.currentValue !== changes.pageIndex.previousValue;

    if (pageIndexChanged) {
      this.currentIndex = changes.pageIndex.currentValue + 1;
    }
    this.updatePageButtons();
  }

  ngOnDestroy() {
    this.jumpToPage.unsubscribe();
    this.goToNextPage.unsubscribe();
    this.goToPreviousPage.unsubscribe();
  }

  updatePageButtons = () => {
    this.pages = this.createPageListStartingAtOne();
    this.firstThreePages = this.pages.slice(0, 3);
    this.lastThreePages = this.pages.slice(
      this.pages.length - 3,
      this.pages.length
    );
    this.middlePages = this.pages
      .filter(element => !this.firstThreePages.includes(element))
      .filter(element => !this.lastThreePages.includes(element));
  };

  createPageListStartingAtOne = (): Array<number> => {
    return Array.from({ length: this.getPaginationSize() }, (_, i) => i + 1);
  };

  getPaginationSize = (): number => {
    const { pageSize, length } = this;
    const divideByZero = !pageSize || pageSize === 0;

    if (!length || divideByZero) {
      return 1;
    }
    return Math.ceil(length / pageSize);
  };

  isActiveButton = (index: number): boolean => {
    return this.currentIndex === index;
  };

  isAtLastIndex = (): boolean => {
    return this.getPaginationSize() === this.currentIndex;
  };

  paginateToPage = (index: number) => {
    this.currentIndex = index;
    this.updatePagination();
  };

  updatePagination = () => {
    this.paginationChange.emit({
      pageIndex: this.currentIndex - 1,
      pageSize: this.pageSize,
    });
  };

  navgiateMiddlePages = () => {
    const { middlePages, currentIndex } = this;
    const index = currentIndex - 4;
    const firstElement = index === 0;
    const lastElement = index + 1 === middlePages.length;

    if (firstElement) {
      return [
        middlePages[index],
        middlePages[index + 1],
        middlePages[index + 2],
      ];
    }
    if (lastElement) {
      return [
        middlePages[index - 2],
        middlePages[index - 1],
        middlePages[index],
      ];
    }
    return [middlePages[index - 1], middlePages[index], middlePages[index + 1]];
  };
}
