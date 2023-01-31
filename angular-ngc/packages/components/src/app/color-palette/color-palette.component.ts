import { Component } from '@angular/core';
import { ColorPalette } from '@intf/components/theme';

@Component({
  selector: 'app-color-palette',
  styles: [],
  template: `
    <nz-row nzType="flex">
      <ng-container *ngFor="let color of colors | keyvalue">
        <nz-col nzSpan="4">
          <color-box [text]="color.key" [color]="color.value"></color-box>
        </nz-col>
      </ng-container>
    </nz-row>
  `,
})
export class ColorPaletteComponent {
  colors = { ...ColorPalette };
}
