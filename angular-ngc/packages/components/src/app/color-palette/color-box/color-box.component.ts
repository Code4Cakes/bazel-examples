import { Component, Input } from '@angular/core';
import { ColorPalette } from '@intf/components/theme';

@Component({
  selector: 'color-box',
  styles: [
    `
      .container {
        color: ${ColorPalette.greyDarkest};
        margin: 8px;
      }

      .color-name {
        font-size: 14px;
        margin-top: 8px;
        margin-bottom: 24px;
      }

      .color-box {
        text-align: center;
        outline: none;
        border-width: 1px;
        border-style: solid;
        padding: 50px;
        border-radius: 4px;
        color: ${ColorPalette.white};
      }
    `,
  ],
  template: `
    <div class="container">
      <div class="color-box" [ngStyle]="{ backgroundColor: color }"></div>
      <h3>{{ text }}</h3>
      <div class="color-name">{{ color }}</div>
    </div>
  `,
})
export class ColorBoxComponent {
  @Input() color: string;
  @Input() text: string;
}
