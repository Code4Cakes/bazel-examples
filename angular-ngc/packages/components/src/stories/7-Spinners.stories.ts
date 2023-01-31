import { storiesOf, moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeModule } from '../app/mat-theme';
import { DataSpinnerModule } from '../app/data-spinner/data-spinner.module';

storiesOf('Spinners', module)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule, ThemeModule, DataSpinnerModule],
    })
  )
  .add('Default', () => ({
    template: `
      <intf-theme>
        <intf-data-spinner [isLoading]="true"></intf-data-spinner>
        <div>Data Loading Behind Spinner</div>
      </intf-theme>
    `,
    props: {
      action: () => window.alert('Banner Action'),
    },
  }));
