import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntfAvatarComponent } from './intf-avatar.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [IntfAvatarComponent],
  exports: [IntfAvatarComponent],
})
export class IntfAvatarModule {}
