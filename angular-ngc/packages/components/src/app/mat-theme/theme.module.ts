import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeComponent } from './theme.component';

@NgModule({
  declarations: [ThemeComponent],
  imports: [FormsModule],
  exports: [ThemeComponent],
})
export class ThemeModule {}
