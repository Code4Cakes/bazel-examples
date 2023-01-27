import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UpgradeModule } from '@angular/upgrade/static';
import { app } from '../../src-legacy/app/scripts/app';

@Component({
  selector: 'sample-app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <intf-theme>
      <mat-toolbar class="toolbar">
        <span>
          <a
            href="https://www.interfolio.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/alt-logo.png" width="150" alt="Interfolio logo" />
          </a>
        </span>

        <div>
          <button
            mat-button
            aria-label="Top menu navigation"
            [matMenuTriggerFor]="topMenu"
            class="topbar-menu"
          >
            Sample App
            <mat-icon>keyboard_arrow_down</mat-icon>
          </button>
          <mat-menu #topMenu>
            <button (click)="navigate('')" mat-menu-item>
              <span>Dashboard</span>
            </button>
            <button (click)="navigate('redux')" mat-menu-item>
              <span>Redux Example</span>
            </button>
            <button (click)="navigate('hybrid')" mat-menu-item>
              <span>Hybrid Example</span>
            </button>
            <button (click)="navigate('legacy')" mat-menu-item>
              <span>Legacy Example</span>
            </button>
          </mat-menu>
        </div>
      </mat-toolbar>
      <mat-sidenav-container class="layout-container">
        <mat-sidenav mode="side" opened>
          <div class="sidenav-menu">
            <button mat-button (click)="navigate('')">
              <span>Dashboard</span>
            </button>
            <button mat-button (click)="navigate('redux')">
              <span>Redux Example</span>
            </button>
            <button mat-button (click)="navigate('hybrid')">
              <span>Hybrid Example</span>
            </button>
            <button mat-button (click)="navigate('legacy')">
              <span>Legacy Example</span>
            </button>
          </div>
        </mat-sidenav>
        <mat-sidenav-content class="p-large">
          <section>
            <router-outlet></router-outlet>
            <div #legacyApp ui-view></div>
          </section>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </intf-theme>
  `,
})
export class AppComponent implements AfterViewInit {
  @ViewChild('legacyApp', { static: false }) legacyApp: ElementRef;

  constructor(private upgrade: UpgradeModule, private router: Router) {}

  ngAfterViewInit() {
    this.upgrade.bootstrap(this.legacyApp.nativeElement, [app.name]);
  }

  navigate(path: string) {
    return this.router.navigate([path]);
  }
}
