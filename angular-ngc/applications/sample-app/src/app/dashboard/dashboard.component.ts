import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sample-app-dashboard',
  styles: [''],
  template: `
    <h2>Dashboard</h2>
    <ng-template featureFlags name="showSample">
      This content will show when flag is enabled
    </ng-template>
  `,
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
