import { Component, ViewChild } from '@angular/core';
import { DialogContainerDirective } from './dialog-container.directive';

@Component({
  selector: 'app-view-container-component',
  template: `
    <view-container-directive></view-container-directive>
  `,
})
export class DialogContainerComponent {
  @ViewChild(DialogContainerDirective, { static: true })
  childWithViewContainer: DialogContainerDirective;

  get childViewContainer() {
    return this.childWithViewContainer.viewContainerRef;
  }
}
