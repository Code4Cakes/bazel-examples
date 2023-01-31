import { NgModule } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Environment } from '@intf/environments/src/environment';
import { FeatureFlags } from '../../src/feature-flags';
import { FeatureFlagsGuard } from '../../src/feature-flags.guard';
import { FeatureFlagsMock } from './feature-flags.testing';
import { FeatureFlagsMockGuard } from './feature-flags.testing.guard';
import { FeatureFlagsMockDirective } from './feature-flag.testing.directive';
import { HTTP_SERVICE } from '../../src/feature-flags.interface';

export class EnvironmentMockService {}

export class FeatureFlagsHttpMockService {}

@NgModule({
  imports: [HttpClientTestingModule],
  declarations: [FeatureFlagsMockDirective],
  providers: [
    { provide: HTTP_SERVICE, useClass: FeatureFlagsHttpMockService },
    { provide: Environment, useClass: EnvironmentMockService },
    { provide: FeatureFlagsGuard, useClass: FeatureFlagsMockGuard },
    { provide: FeatureFlags, useClass: FeatureFlagsMock },
  ],
  exports: [FeatureFlagsMockDirective],
})
export class FeatureFlagsTestingModule {}
