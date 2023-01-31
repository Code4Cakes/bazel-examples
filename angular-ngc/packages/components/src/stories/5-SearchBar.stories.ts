import { storiesOf, moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ThemeModule } from '../app/mat-theme';
import { SearchBarComponent } from '../app/search-bar/search-bar.component';

storiesOf('Search Bar', module)
  .addDecorator(
    moduleMetadata({
      declarations: [SearchBarComponent],
      imports: [
        BrowserAnimationsModule,
        ThemeModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
      ],
    })
  )
  .add('Default', () => ({
    template: `
      <intf-theme>
        <intf-search-bar placeholder="Example Placeholder"></intf-search-bar>
      </intf-theme>
    `,
    props: {},
  }));
