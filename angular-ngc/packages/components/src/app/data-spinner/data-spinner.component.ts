import { Component, Input } from '@angular/core';

@Component({
  selector: 'intf-data-spinner',
  styles: [
    `
      .data-spinner {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.5);
        z-index: 2;
      }
    `,
  ],
  template: `
    <div *ngIf="isLoading" class="data-spinner">
      <mat-progress-spinner
        color="accent"
        mode="indeterminate"
        [diameter]="diameter"
      >
      </mat-progress-spinner>
    </div>
  `,
})
export class DataSpinnerComponent {
  @Input() isLoading: boolean;
  @Input() diameter = 50;
}
