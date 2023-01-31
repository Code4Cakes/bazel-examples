import { Directive } from '@angular/core';
import { FeatureFlagsDirective } from '../../src/feature-flags.directive';

@Directive({
  selector: '[featureFlags]',
})
export class FeatureFlagsMockDirective extends FeatureFlagsDirective {}
