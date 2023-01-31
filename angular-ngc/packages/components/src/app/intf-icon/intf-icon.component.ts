import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'intf-icon',
  template:
    '<i nz-icon [ngStyle]="styles" [nzType]="icon" [nzTheme]="theme"></i>',
  styles: [
    `
      .anticon {
        vertical-align: 0 !important;
      }
    `,
  ],
})
export class IntfIconComponent {
  @Input() icon: string;
  @Input() theme: 'outline';
  @Input() styles: object = {};
}
