import { Component, Input } from '@angular/core';
import { ColorPalette } from '@intf/components/theme';

@Component({
  selector: 'intf-empty',
  styles: [
    `
      .intf-empty {
        background-color: ${ColorPalette.white};
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.35);
        border-radius: 3px;
      }
    `,
  ],
  template: `
    <nz-empty class="intf-empty p-huge" [nzNotFoundContent]="content">
      <ng-template #content>
        <span>{{ message }}</span>
      </ng-template>
    </nz-empty>
  `,
})
export class IntfEmptyComponent {
  @Input() message = 'Nothing here.';
}
