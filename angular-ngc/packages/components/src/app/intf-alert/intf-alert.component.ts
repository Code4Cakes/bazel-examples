import { Component, Input } from '@angular/core';

@Component({
  selector: 'intf-alert',
  styleUrls: ['./intf-alert.component.scss'],
  template: `
    <div
      *ngIf="!hidden"
      class="intf-alert p-l-small p-r-small m-b-small border-radius"
      [ngClass]="type"
    >
      <mat-icon *ngIf="icon" class="m-small" ngClass="{{ type }}-icon">
        error_outline
      </mat-icon>

      <ng-content select="[alertContent]"> </ng-content>

      <div class="closeable m-b-large" *ngIf="closable">
        <button
          mat-icon-button
          (click)="closeAlert()"
          aria-label="close alert box"
        >
          <mat-icon>close</mat-icon>
        </button>
      </div>
    </div>
  `,
})
export class IntfAlertComponent {
  @Input() type: 'primary' | 'success' | 'info' | 'error' = 'primary';
  @Input() icon = false;
  @Input() closable = true;
  hidden = false;

  closeAlert() {
    this.hidden = true;
  }
}
