import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataSpinnerComponent } from './data-spinner.component';

@NgModule({
  declarations: [DataSpinnerComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [DataSpinnerComponent],
})
export class DataSpinnerModule {}
