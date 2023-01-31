import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'intf-theme',
  template: `
    <div class="intf">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['theme.component.scss'],
})
export class ThemeComponent {}
