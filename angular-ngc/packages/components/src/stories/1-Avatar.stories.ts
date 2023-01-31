import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ThemeModule } from '@intf/components/mat-theme';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { IntfAvatarComponent } from '../app/intf-avatar';
import { IntfIconModule } from '../app/intf-icon';

const styles = `
  .container {
    display: flex;
    align-items: center;

    .intf {
      display: flex;
    }
  }
  
  .container intf-avatar {
    margin: 10px;
  }
`;

storiesOf('Avatar', module)
  .addDecorator(
    moduleMetadata({
      declarations: [IntfAvatarComponent],
      imports: [CommonModule, MatIconModule, ThemeModule],
    })
  )
  .add('Overview', () => ({
    styles: [styles],
    template: `
      <intf-theme>
        <div class="container">
          <intf-avatar [fontSize]="25" [size]="60" text="JD"></intf-avatar>
          <intf-avatar [backgroundColor]="'#F17461'" [size]="50" icon="info_outline"></intf-avatar>
          <intf-avatar [size]="40" text="JD"></intf-avatar>
          <intf-avatar icon="info_outline"></intf-avatar>
        </div>
      </intf-theme>
     `,
  }))
  .add('Avatar with text', () => ({
    styles: [styles],
    template: `
      <intf-theme>
        <div class="container">
          <intf-avatar [size]="60" text="JD"></intf-avatar>
          <intf-avatar [size]="50" text="JD"></intf-avatar>
          <intf-avatar size="40" text="JD"></intf-avatar>
          <intf-avatar text="JD"></intf-avatar>
        </div>
      </intf-theme>
     `,
  }))
  .add('Avatar with icons', () => ({
    styles: [styles],
    template: `
      <intf-theme>
        <div class="container">
          <intf-avatar [size]="60" icon="info_outline"></intf-avatar>
          <intf-avatar [size]="50" icon="info_outline"></intf-avatar>
          <intf-avatar [size]="40" icon="info_outline"></intf-avatar>
          <intf-avatar icon="info_outline"></intf-avatar>
        </div>
      </intf-theme>
     `,
  }));
