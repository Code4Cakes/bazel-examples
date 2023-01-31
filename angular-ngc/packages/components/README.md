# @intf/components

Interfolio design system implemented with Storybook.

# Running storybook

Running `yarn storybook` will open the component library locally and can be accessed at `localhost:6006`

## Import

To import into your project go to your BUILD.bazel file and add in the deps section

`//packages/components:lib`

If you are using a legacy app (one with AngularJS) import it with

`//packages/components:legacy`

## Usage

To use Interfolio components simply import the library and the component you want to use:

```javascript
// app.module.ts
import { NgModule } from '@angular/core';
import { IntfButtonModule } from '@intf/components';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [IntfButtonModule],
  bootstrap: [AppComponent],
})
export class AppModule {}

// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <intf-button></intf-button>
  `,
  styleUrls: [],
})
export class AppComponent {}
```

## Testing

Visual testing of components has not been setup yet.

## Technology

Angular
Typescript
Storybook
Ant Design
Jest
