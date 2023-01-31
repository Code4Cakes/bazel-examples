import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ColorBoxModule } from './color-box/color-box.module';
import { ColorPaletteComponent } from './color-palette.component';

@NgModule({
  declarations: [ColorPaletteComponent],
  imports: [NzGridModule, CommonModule, ColorBoxModule],
  exports: [ColorPaletteComponent],
})
export class ColorPaletteModule {}
