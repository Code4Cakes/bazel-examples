import { Component } from '@angular/core';

@Component({
  selector: 'sample-app-home',
  template: `
    <ng-container>
      <h3 class="m-b-small">
        Hybrid page displaying both Angular and AngularJS Components
      </h3>
      <div class="m-b-large">
        <pages-home class="m-b-medium"></pages-home>
      </div>

      <h4>Material Design component</h4>
      <mat-form-field appearance="fill">
        <mat-label>Choose a date</mat-label>
        <input matInput [matDatepicker]="picker" />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
    </ng-container>
  `,
  styles: [''],
})
export class HomeComponent {
  date = null;

  constructor() {}
}
