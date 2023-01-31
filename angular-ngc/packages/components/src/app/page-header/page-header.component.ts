import { Component, Input } from '@angular/core';
import { IntfBreadcrumb } from '../intf-breadcrumbs';
import { TenantIdService } from '@intf/tenant/tenant-id.service';
import { Environment } from '@intf/environments/src/environment';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent {
  @Input() pageTitle: string;
  @Input() pageSubtitle: string;
  @Input() breadcrumbs: Array<IntfBreadcrumb> = [];

  constructor(
    private tenantIdService: TenantIdService,
    private environment: Environment
  ) {}

  ngOnChanges(): void {
    const tenantName = this.tenantIdService.tenantName;
    const tenantId = this.tenantIdService.tenantId;
    const homeUrl = this.environment.config.HOME_API.replace('api-', '');
    const tenantPath: Array<IntfBreadcrumb> = [
      {
        label: tenantName,
        path: `${homeUrl}/${tenantId}`,
      },
    ];
    this.breadcrumbs = [...tenantPath, ...this.breadcrumbs];
  }
}
