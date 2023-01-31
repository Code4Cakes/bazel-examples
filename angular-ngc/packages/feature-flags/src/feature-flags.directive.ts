import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { FeatureFlags } from './feature-flags';

@Directive({
  selector: '[featureFlags]',
})
export class FeatureFlagsDirective implements OnInit {
  @Input() name: string[] | string;
  @Input() findId = '';
  @Input() alternative: TemplateRef<any>;

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private featureFlags: FeatureFlags
  ) {}

  ngOnInit() {
    const {
      featureFlags,
      templateRef,
      viewContainer,
      name,
      findId,
      alternative,
    } = this;

    if (featureFlags.getFlag(name, findId)) {
      viewContainer.createEmbeddedView(templateRef);
      return;
    }
    if (alternative) {
      viewContainer.createEmbeddedView(alternative);
    }
  }
}
