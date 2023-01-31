import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'intf-banner',
  template: `
    <div class="intf-banner" ngClass="{{ type }}-banner" role="alert">
      <div class="banner-start">
        <div class="icon-background-circle">
          <mat-icon class="banner-icon">{{ iconType }}</mat-icon>
        </div>
        <div class="banner-content">
          <h5 *ngIf="title">{{ title }}</h5>
          <p *ngIf="message">{{ message }}</p>
          <ng-content></ng-content>
        </div>
      </div>

      <div class="banner-end">
        <button
          *ngIf="buttonText"
          class="banner-button"
          (click)="handleAction()"
          mat-button
        >
          {{ buttonText?.toUpperCase() }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  @Input() title = '';
  @Input() message = '';
  @Input() buttonText = '';
  @Input() type: 'error' | 'info' | 'warning';
  @Output() bannerAction: EventEmitter<string> = new EventEmitter<string>();
  iconType: string;

  ngOnInit() {
    const { type } = this;

    switch (type) {
      case 'error':
        this.iconType = 'error_outline';
        break;
      case 'warning':
        this.iconType = 'error_outline';
        break;
      default:
        this.iconType = 'info_outline';
    }
  }

  handleAction() {
    this.bannerAction.emit(this.type);
  }
}
