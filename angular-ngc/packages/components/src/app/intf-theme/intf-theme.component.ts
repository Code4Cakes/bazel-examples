import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'intf-theme',
  template: `
    <main class="intf">
      <ng-content></ng-content>
    </main>
  `,
  styleUrls: ['intf-theme.component.scss'],
})
export class IntfThemeComponent {}
