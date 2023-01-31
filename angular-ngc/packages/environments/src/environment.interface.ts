import { InjectionToken } from '@angular/core';

export interface IEnvConfig {
  [key: string]: any;
}

export const ENV_CONFIG = new InjectionToken<IEnvConfig>('env.config');
