import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: 'view-container-directive',
})
export class DialogContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
