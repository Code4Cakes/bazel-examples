import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntfAlertComponent } from './intf-alert.component';
import { MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [IntfAlertComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [IntfAlertComponent],
})
export class IntfAlertModule {}
