// import * as angular from 'angular';
import { setAngularJSGlobal, UpgradeModule } from '@angular/upgrade/static';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationUpgradeModule } from '@angular/common/upgrade';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
// import { scopeProvider } from '@medicine-cabinet/v2/providers/$scope';
import { IntfThemeModule } from '@intf/components/intf-theme';
import { EnvironmentModule } from '@intf/environments/src/environment.module';
import { FeatureFlags, FeatureFlagsModule } from '@intf/feature-flags';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { todos } from './todo/todo.reducer';
import { TodoEffects } from './todo/todo.effects';
import { LibAModule } from '@intf/lib-a';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        LibAModule,
        UpgradeModule,
        BrowserAnimationsModule,
        // IntfThemeModule,
        AppRoutingModule,
        HttpClientModule,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatNativeDateModule,
        // EnvironmentModule.forRoot({
        //   EXAMPLE_API: 'https://example.interfolio.com',
        //   FEATURE_FLAGS: {
        //     showSample: { enabled: true },
        //   },
        // }),
        // FeatureFlagsModule.forRoot(),
        // StoreModule.forRoot({ todos }),
        // EffectsModule.forRoot([TodoEffects]),
        // StoreDevtoolsModule.instrument({
        //   maxAge: 25,
        //   logOnly: false,
        // }),
        // LocationUpgradeModule.config(),
    ],
    providers: [
        // scopeProvider,
        // FeatureFlags,
        // {
        //   provide: APP_INITIALIZER,
        //   useFactory: (service: FeatureFlags) => {
        //     return () => service.initialize$('');
        //   },
        //   multi: true,
        //   deps: [FeatureFlags],
        // },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    // constructor() {
    // @ts-ignore
    // setAngularJSGlobal(angular.default || angular);
    // }
}
