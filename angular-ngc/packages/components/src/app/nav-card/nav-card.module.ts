import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavCardComponent } from './nav-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NavCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
  ],
  exports: [NavCardComponent],
})
export class NavCardModule {}
