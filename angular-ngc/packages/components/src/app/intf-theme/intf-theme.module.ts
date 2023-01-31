import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IntfThemeComponent } from './intf-theme.component';
import { NzGridModule, NzIconService } from 'ng-zorro-antd';

@NgModule({
  declarations: [IntfThemeComponent],
  imports: [NzGridModule, FormsModule],
  exports: [IntfThemeComponent],
})
export class IntfThemeModule {
  constructor(private nzIconService: NzIconService) {
    this.nzIconService.changeAssetsSource('/packages/components/src');
  }
}
