import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingOverlayComponent } from './loading-overlay.component';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule],
  declarations: [LoadingOverlayComponent],
  exports: [LoadingOverlayComponent],
})
export class LoadingOverlayModule {}
