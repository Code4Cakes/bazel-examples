# @intf/environments

Library for using a environment singleton across angular applications.

## Import

To import into your project go to your BUILD.bazel file and add in the deps section `//packages/environments:service`

## Usage

Initialize the library in your AppModule.ts:

```javascript
import { NgModule } from '@angular/core';
import { EnvironmentModule } from '@intf/environments/src/environment.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    EnvironmentModule.forRoot({
      // add your configs here
      TEST_API: 'http://www.example.com',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
```

To access the environment config inject the service. For example in a component:

```javascript
import { Component, OnInit } from '@angular/core';
import { Environment } from '@intf/environments/src/environment';

@Component({...})
export class MyComponent implements OnInit {
  // Initialize the service
  constructor(private environment: Environment) {}

  ngOnInit() {
    const { environment } = this;
    // Access the config object
    console.log(environment.config.TEST_API);
  }
}
```

The config file can also be overwritten if a html meta tag (meta[name="config/environment"]) is injected into the index.html file.

## Testing

`yarn bazel test //packages/environments/...`

## Technology

- Typescript
- Angular
- Jest
