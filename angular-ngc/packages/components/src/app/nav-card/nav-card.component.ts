import { Component, Input } from '@angular/core';

interface CardData {
  label?: string;
  description?: string;
  icon?: string;
  link?: string;
}

@Component({
  selector: 'nav-card',
  template: `
    <a class="card-anchor" [href]="data.link">
  <mat-card class="nav-card">
    <mat-card-header>
      <mat-card-title>
        {{ data.label }}
      </mat-card-title>
      <span class="icon-hover">
      <mat-icon>
        {{ data.icon }}
      </mat-icon>
        </span>
    </mat-card-header>
    <mat-card-content>
      {{ data.description }}
    </mat-card-content>
  </mat-card>
    </a>
  `
})
export class NavCardComponent{
  @Input() data: CardData
}
