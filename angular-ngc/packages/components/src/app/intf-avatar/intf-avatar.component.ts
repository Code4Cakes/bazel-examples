import { Component, Input, OnInit } from '@angular/core';
import { ColorPalette } from '@intf/components/theme';

@Component({
  selector: 'intf-avatar',
  styleUrls: ['./intf-avatar.component.scss'],
  template: `
    <div [ngStyle]="customStyles" class="squircle">
      <div *ngIf="text; else showIcon">{{ text }}</div>
      <ng-template #showIcon>
        <mat-icon>{{ icon }}</mat-icon>
      </ng-template>
    </div>
  `,
})
export class IntfAvatarComponent implements OnInit {
  @Input() style: object;
  @Input() icon: string;
  @Input() text: string;
  @Input() size: number;
  @Input() backgroundColor: string;
  @Input() color: string;
  @Input() fontSize: number;

  customStyles: object;

  ngOnInit() {
    const { size, color, fontSize, backgroundColor } = this;

    this.customStyles = {
      backgroundColor: backgroundColor || ColorPalette.primary,
      width: size ? `${size}px` : '32px',
      height: size ? `${size}px` : '32px',
      fontSize: fontSize ? `${fontSize}px` : '14px',
      color: color || '#ffffff',
    };
  }
}
