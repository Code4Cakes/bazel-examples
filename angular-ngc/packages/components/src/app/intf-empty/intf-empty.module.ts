import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { IntfEmptyComponent } from './intf-empty.component';

@NgModule({
  declarations: [IntfEmptyComponent],
  imports: [CommonModule, NzEmptyModule],
  exports: [IntfEmptyComponent],
})
export class IntfEmptyModule {}
