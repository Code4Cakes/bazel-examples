import { moduleMetadata, storiesOf } from '@storybook/angular';
import { NzGridModule } from 'ng-zorro-antd';
import { WelcomeComponent } from '../app/welcome/welcome.component';
import { ColorPaletteComponent } from '../app/color-palette/color-palette.component';
import { ColorBoxModule } from '../app/color-palette/color-box/color-box.module';

storiesOf('Welcome', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [NzGridModule, ColorBoxModule],
    })
  )
  .add('Getting Started', () => ({
    component: WelcomeComponent,
  }))
  .add('Color Palette', () => ({
    component: ColorPaletteComponent,
  }));
