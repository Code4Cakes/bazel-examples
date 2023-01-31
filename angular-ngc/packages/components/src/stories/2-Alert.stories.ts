import { storiesOf, moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IntfAlertComponent } from '../app/intf-alert';

storiesOf('Alert', module)
  .addDecorator(
    moduleMetadata({
      declarations: [IntfAlertComponent],
      imports: [BrowserAnimationsModule, MatButtonModule, MatIconModule],
    })
  )
  .add('Overview', () => ({
    template: `
        <div>
          <intf-alert type="primary">
            <span alertContent>Primary Alert</span>
          </intf-alert>
          
          <div style="margin: 20px"></div>
          
          <intf-alert type="success">
            <span alertContent>Alert Success</span>
          </intf-alert>
          
          <div style="margin: 20px"></div>
          
          <intf-alert type="info">
            <span alertContent>Alert Info</span>
          </intf-alert>
          
          <div style="margin: 20px"></div>
          
          <intf-alert type="error">
            <span alertContent>Alert Error</span>
          </intf-alert>
          
          <div style="margin: 20px"></div>
          
          <intf-alert [closable]="false" type="info">
            <span alertContent>Alert without close button</span>
          </intf-alert>
        </div>`,
  }));
