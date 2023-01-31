import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UpgradeModule } from '@angular/upgrade/static';

// import {app} from '../src-legacy/app/scripts/app';

@Component({
    selector: 'sample-app-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html',
})
export class AppComponent {
    // @ViewChild('legacyApp', {static: false}) legacyApp: ElementRef;

    // constructor(private upgrade: UpgradeMod, private router: Router) {
    // }
    // constructor(private router: Router) {
    // }

    // ngAfterViewInit() {
    // this.upgrade.bootstrap(this.legacyApp.nativeElement, [app.name]);
    // }

    // navigate(path: string) {
    //     return this.router.navigate([path]);
    // }
}
