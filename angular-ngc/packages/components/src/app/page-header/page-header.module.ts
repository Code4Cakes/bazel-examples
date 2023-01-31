import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header.component';
import { IntfBreadcrumbsModule } from '@intf/components/intf-breadcrumbs';
import { TenantModule } from '@intf/tenant/tenant.module';

@NgModule({
  imports: [CommonModule, IntfBreadcrumbsModule, TenantModule],
  declarations: [PageHeaderComponent],
  exports: [PageHeaderComponent],
})
export class PageHeaderModule {}
