import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IntfEmptyModule } from '@intf/components/intf-empty';
import { IntfIconModule } from '@intf/components/intf-icon';
import { IntfTableComponent } from './intf-table.component';

@NgModule({
  declarations: [IntfTableComponent],
  imports: [CommonModule, NzTableModule, IntfEmptyModule, IntfIconModule],
  exports: [IntfTableComponent],
})
export class IntfTableModule {}
