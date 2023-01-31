import { NgModule } from '@angular/core';
import { TenantService } from '@intf/tenant/tenant.service';
import { TenantIdService } from '@intf/tenant/tenant-id.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule],
  providers: [TenantService, TenantIdService],
})
export class TenantModule {}
