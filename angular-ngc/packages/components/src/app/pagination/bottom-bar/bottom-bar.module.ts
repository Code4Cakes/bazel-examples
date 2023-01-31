import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BottomBarComponent } from './bottom-bar.component';

@NgModule({
  declarations: [BottomBarComponent],
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule],
  exports: [BottomBarComponent],
})
export class BottomBarModule {}
