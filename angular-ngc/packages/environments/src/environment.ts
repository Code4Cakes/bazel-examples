import { Inject } from '@angular/core';
import { IEnvConfig, ENV_CONFIG } from './environment.interface';
import { getMetaTagConfig } from './environment.utils';

export class Environment {
  config: IEnvConfig;

  constructor(@Inject(ENV_CONFIG) config: IEnvConfig) {
    this.setConfig(config, getMetaTagConfig());
  }

  public updateConfig(newConfig: IEnvConfig) {
    this.setConfig(this.config, newConfig);
  }

  private setConfig(oldConfig: {}, newConfig: {}) {
    this.config = {
      ...oldConfig,
      ...newConfig,
    };
  }
}
