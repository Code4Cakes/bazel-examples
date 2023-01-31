import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Environment } from '@intf/environments/src/environment';
import { FeatureFlagsHttpService } from './feature-flags-http.service';
import { IFeatureFlags, HTTP_SERVICE } from './feature-flags.interface';

export class FeatureFlags {
  featureFlags: IFeatureFlags;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    @Inject(HTTP_SERVICE) public http: FeatureFlagsHttpService,
    public environment: Environment
  ) {}

  getFlag = (flags: Array<string> | string, id: string = ''): boolean => {
    const { featureFlags, document } = this;
    const { pathname } = document.location;
    const tenantUrlParam = pathname.match(/^\/([^\/]*).*$/);
    const tenantId = tenantUrlParam[1];

    const tenant = id || tenantId;
    const selectedFlags = Array.isArray(flags) ? flags : [flags];

    return selectedFlags.every(name => {
      if (!featureFlags) {
        console.warn('Feature Flag library has not been initialized.');
        return false;
      }
      const flag = featureFlags[name];
      if (Array.isArray(flag)) {
        return flag.includes(Number(tenant));
      }
      return flag && flag.enabled;
    });
  };

  getFeatureFlags$ = (
    url: string
  ): Observable<IFeatureFlags | { error: string }> => {
    const { http, environment } = this;

    this.featureFlags = { ...environment.config.FEATURE_FLAGS };
    if (!url) {
      return of(this.featureFlags);
    }
    return http.getFeatures$(url).pipe(
      map(data => {
        let apiFlags: IFeatureFlags = {};
        data.forEach(item => {
          apiFlags = { ...item, ...apiFlags };
        });

        this.featureFlags = { ...apiFlags, ...this.featureFlags };
        return this.featureFlags;
      }),
      catchError(error => {
        const message = error ? error.message : 'Could not get feature flags.';
        return of({ error: message });
      })
    );
  };

  initialize$ = (
    url: string
  ): Observable<IFeatureFlags | { error: string }> => {
    return this.getFeatureFlags$(url);
  };
}
