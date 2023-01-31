# @intf/feature-flags

Library for all things feature flags: fetching flags, route guards and directives to show/hide content.

## Import

To import into your project go to your BUILD.bazel file and add in the deps section `//packages/feature-flags`

## Usage

#### Configuration

To use the feature flags service first import the module in `app.module.ts` and initialize the service.

```javascript
// app.module.ts
import { FeatureFlagsModule, FeatureFlags } from '@intf/feature-flags';
import { EnvironmentModule } from '@intf/environments/src/environment.module';

@NgModule({
  imports: [
    EnvironmentModule.forRoot({
      FEATURE_FLAGS: {
        legacyFlag: [1],
        flag: { enabled: true }
      },
    }), // feature-flags requires environments to be loaded
    FeatureFlagsModule.forRoot(),
  ],
  providers: [
    FeatureFlags,
    {
      provide: APP_INITIALIZER,
      useFactory: (service: FeatureFlags) => {
        const url = "https://www.example.com"; // feature flag endpoint
        return () => service.initialize$(url).toPromise();
      },
      deps: [FeatureFlags],
    }
  ]
})
```

> This example uses APP_INITIALIZER because typically flags will load before the app. However, the service can be initialized anywhere.

#### Route Guard

Route flag property takes one, n+1, or legacy flags.

- string `flags: 'alm'`
- array `flags: ['alm', 'far2rpt']`
- legacy `flags: 'legacyFlag'`
  > legacy flags requires a tenant id param to work

```javascript
// app-routing.module.ts

import { FeatureFlagsGuard } from '@intf/feature-flags';

// Sample route
{
    path: 'institutions/:id',
    component: InstitutionShowComponent,
    resolve: { ... },
    data: {
      ...,
      flags: ['alm', 'far2rpt'],
    },
    canActivate: [FeatureFlagsGuard],
},
```

#### Directive (show/hide content)

```javascript
// in your feature/page module
import { FeatureFlagsModule } from '@intf/feature-flags';

@NgModule({
  imports: [FeatureFlagsModule], // only call forRoot in app.module
})
```

```python
# In your BUILD.bazel
deps = [
  ...,
  "//packages/feature-flags",
]
```

```html
// In your template
<ng-template featureFlags name="enabledFlag">
  This content will show when flag is enabled
</ng-template>

// Loading a list of flags
<ng-template featureFlags [name]="['enabledFlag', 'alm']">
  This content will show when all flags are enabled
</ng-template>

// Loading an alternative (if/else)
<ng-template featureFlags name="disabledFlag" [alternative]="alternativeView">
  <h1>This content will be hidden</h1>
</ng-template>
<ng-template #alternativeView>
  <h2>This content will show</h2>
</ng-template>

// Loading flags for legacy support
<ng-template featureFlags name="enabledLegacy" findId="1">
  <h1>This content will show</h1>
</ng-template>
```

## Testing

`yarn bazel test //packages/feature-flags/...`

`yarn bazel test //packages/feature-flags:test`
