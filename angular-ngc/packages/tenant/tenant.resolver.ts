import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, CanActivate } from '@angular/router';
import { Environment } from '@intf/environments/src/environment';

@Injectable()
export class TenantResolver implements CanActivate {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private environment: Environment
  ) {}

  canActivate(): boolean {
    const { environment, document, router } = this;
    // @ts-ignore
    const tenantId = window.gon.tenantId;

    if (tenantId) {
      router.navigate([`/${tenantId}`]);
      return true;
    }
    document.location.href = environment.config.ACCOUNT_URL;
    return false;
  }
}
