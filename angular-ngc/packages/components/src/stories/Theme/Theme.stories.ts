import { storiesOf, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ThemeModule } from '@intf/components/mat-theme';
import { TypographyStory } from './Typography';
import { SpacingStory } from './Spacing';
import { ButtonStory } from './Buttons';
import { OverviewStory } from './Overview';

storiesOf('Theme', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [FormsModule, MatDividerModule, MatButtonModule, ThemeModule],
    })
  )
  .add('Overview', OverviewStory)
  .add('Typography', TypographyStory)
  .add('Spacing', SpacingStory)
  .add('Button', ButtonStory);
