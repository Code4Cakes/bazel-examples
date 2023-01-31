import { storiesOf, moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeModule } from '../app/mat-theme';
import { BottomBarModule } from '../app/pagination/bottom-bar';

storiesOf('Paginator', module)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule, ThemeModule, BottomBarModule],
    })
  )
  .add('Bottom Bar', () => ({
    template: `
      <intf-theme>
        <h4 class="m-t-large m-b-large">Bottom Bar</h4>

        <axiom-bottom-bar length="200">
        </axiom-bottom-bar>

        <h4 class="m-t-large m-b-large">Bottom Bar with Hidden Elements</h4>

        <axiom-bottom-bar length="1000">
        </axiom-bottom-bar>

      </intf-theme>
    `,
    props: {},
  }));
