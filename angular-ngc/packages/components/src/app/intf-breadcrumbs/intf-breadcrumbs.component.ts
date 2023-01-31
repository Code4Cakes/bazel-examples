import { Component, Input, OnChanges } from '@angular/core';

export interface IntfBreadcrumb {
  label: string;
  path?: string;
}

@Component({
  selector: 'intf-breadcrumbs',
  styleUrls: ['./intf-breadcrumbs.component.scss'],
  template: `
    <div class="intf-breadcrumbs-container">
      <div
        *ngFor="let crumb of breadcrumbs; let i = index"
        class="intf-breadcrumb"
      >
        <a
          [routerLink]="crumb.path"
          *ngIf="
            crumb.path && !crumb.path.startsWith('http');
            else noRelativePath
          "
          >{{ crumb.label }}</a
        >
        <ng-template #noRelativePath>
          <a
            *ngIf="
              crumb.path && crumb.path.startsWith('http');
              else noCrumbPath
            "
            [href]="crumb.path"
          >
            {{ crumb.label }}
          </a>
        </ng-template>
        <ng-template #noCrumbPath>{{ crumb.label }}</ng-template>
        <mat-icon *ngIf="i < breadcrumbs.length - 1" class="breadcrumb-icon">
          arrow_forward_ios
        </mat-icon>
      </div>
    </div>
  `,
})
export class IntfBreadcrumbsComponent {
  @Input() breadcrumbs: Array<IntfBreadcrumb> = [];
}
