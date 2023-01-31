import { InjectionToken } from '@angular/core';

export interface IFeatureFlags {
  [key: string]: { enabled: boolean } | number[];
}

export const HTTP_SERVICE = new InjectionToken<any>('http.service');
