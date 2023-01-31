import { storiesOf, moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { IntfBreadcrumbsComponent } from '../app/intf-breadcrumbs';

storiesOf('Breadcrumbs', module)
  .addDecorator(
    moduleMetadata({
      declarations: [IntfBreadcrumbsComponent],
      imports: [BrowserAnimationsModule, RouterTestingModule, MatIconModule],
    })
  )
  .add('Default', () => ({
    template: `
      <intf-breadcrumbs [breadcrumbs]="crumbs"></intf-breadcrumbs>
    `,
    props: {
      crumbs: [
        {
          label: 'First',
          path: '/home',
        },
        {
          label: 'Second',
          path: '/home/test',
        },
        {
          label: 'Third',
        },
      ],
    },
  }));
