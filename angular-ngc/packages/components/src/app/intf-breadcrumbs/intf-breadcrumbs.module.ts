import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { IntfBreadcrumbsComponent } from './intf-breadcrumbs.component';

@NgModule({
  declarations: [IntfBreadcrumbsComponent],
  exports: [IntfBreadcrumbsComponent],
  imports: [CommonModule, RouterModule, MatIconModule],
})
export class IntfBreadcrumbsModule {}
