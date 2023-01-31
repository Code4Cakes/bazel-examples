import { InjectionToken, NgModule, Optional } from '@angular/core';
import { FeatureFlagsDirective } from './feature-flags.directive';
import { FeatureFlagsHttpService } from './feature-flags-http.service';
import { FeatureFlags } from './feature-flags';
import { FeatureFlagsGuard } from './feature-flags.guard';
import { HTTP_SERVICE } from './feature-flags.interface';

@NgModule({
  declarations: [FeatureFlagsDirective],
  exports: [FeatureFlagsDirective],
})
export class FeatureFlagsModule {
  constructor(@Optional() featureFlags: FeatureFlags) {}

  static forRoot() {
    return {
      ngModule: FeatureFlagsModule,
      providers: [
        {
          provide: HTTP_SERVICE,
          useClass: FeatureFlagsHttpService,
        },
        {
          provide: FeatureFlags,
          useClass: FeatureFlags,
        },
        {
          provide: FeatureFlagsGuard,
          useClass: FeatureFlagsGuard,
        },
      ],
    };
  }
}
