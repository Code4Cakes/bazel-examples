import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorBoxComponent } from './color-box.component';

@NgModule({
  declarations: [ColorBoxComponent],
  imports: [CommonModule],
  exports: [ColorBoxComponent],
})
export class ColorBoxModule {}
