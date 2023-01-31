import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Environment } from '@intf/environments/src/environment';
import { FeatureFlags } from '../../src/feature-flags';
import { FeatureFlagsHttpService } from '../../src/feature-flags-http.service';
import { IFeatureFlags, HTTP_SERVICE } from '../../src/feature-flags.interface';

export class FeatureFlagsMock implements FeatureFlags {
  featureFlags: IFeatureFlags = {};

  constructor(
    @Inject(DOCUMENT) public document: Document,
    @Inject(HTTP_SERVICE) public http: FeatureFlagsHttpService,
    public environment: Environment
  ) {}

  initialize$ = (
    url: string
  ): Observable<IFeatureFlags | { error: string }> => {
    return this.getFeatureFlags$(url);
  };

  getFeatureFlags$ = (
    url: string
  ): Observable<IFeatureFlags | { error: string }> => {
    return of(this.featureFlags);
  };

  getFlag = (flags: Array<string> | string, id: string = ''): boolean => {
    const selectedFlags = Array.isArray(flags) ? flags : [flags];

    return selectedFlags.every(name => {
      const flag = this.featureFlags[name];

      if (Array.isArray(flag)) {
        return flag.includes(Number(id));
      }
      return flag && flag.enabled;
    });
  };
}
