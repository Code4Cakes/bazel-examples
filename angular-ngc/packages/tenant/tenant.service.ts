import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

/**
 * @deprecated 01/27/2021. Use TenantIdService instead.
 */
@Injectable()
export class TenantService {
  public tenantId: string;

  constructor(private router: Router) {
    console.warn('TenantService is deprecated. use TenantIdService');
    this.router.events
      .pipe(
        filter(event => event instanceof RoutesRecognized),
        tap(
          (e: RoutesRecognized) =>
            (this.tenantId = e.url.match(/^\/([^\/]*).*$/)[1])
        )
      )
      .subscribe();
  }
}
