import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { FeatureFlags } from './feature-flags';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagsGuard implements CanActivate {
  constructor(private router: Router, private featureFlags: FeatureFlags) {}

  canActivate({ data, params }: ActivatedRouteSnapshot): boolean {
    const { router, featureFlags } = this;
    const { flag } = data;
    const tenantId = params ? params.tenantId : null;
    const redirect = data.redirect || null;
    const defaultRedirect = tenantId ? `/${tenantId}` : '/';

    if (featureFlags.getFlag(flag, tenantId)) {
      return true;
    }
    router.navigate([redirect || defaultRedirect]);
    return false;
  }
}
