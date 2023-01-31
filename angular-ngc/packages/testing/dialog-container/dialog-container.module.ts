import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogContainerDirective } from './dialog-container.directive';
import { DialogContainerComponent } from './dialog-container.component';

@NgModule({
  declarations: [DialogContainerComponent, DialogContainerDirective],
  imports: [CommonModule],
  exports: [DialogContainerComponent, DialogContainerDirective],
})
export class DialogContainerModule {}
