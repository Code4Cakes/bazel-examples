import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IntfIconComponent } from './intf-icon.component';

@NgModule({
  declarations: [IntfIconComponent],
  imports: [NzIconModule, CommonModule],
  exports: [IntfIconComponent],
})
export class IntfIconModule {}
