import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BannerComponent } from './banner.component';

@NgModule({
  declarations: [BannerComponent],
  entryComponents: [BannerComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [BannerComponent],
})
export class BannerModule {}
