import { InjectionToken, NgModule, Optional } from '@angular/core';
import { Environment } from './environment';
import { ENV_CONFIG, IEnvConfig } from './environment.interface';

@NgModule()
export class EnvironmentModule {
  constructor(@Optional() environment: Environment) {}

  static forRoot(config: IEnvConfig) {
    return {
      ngModule: EnvironmentModule,
      providers: [
        {
          provide: ENV_CONFIG,
          useValue: config,
        },
        {
          provide: Environment,
          useClass: Environment,
        },
      ],
    };
  }
}
