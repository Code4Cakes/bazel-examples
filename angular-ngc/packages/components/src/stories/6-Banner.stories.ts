import { storiesOf, moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeModule } from '../app/mat-theme';
import { BannerModule } from '../app/banner/banner.module';

storiesOf('Banner', module)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule, ThemeModule, BannerModule],
    })
  )
  .add('Default', () => ({
    template: `
      <intf-theme>
        <div class="m-b-large">
          <intf-banner 
            type="info" 
            title="Are you looking for your open activity input request?" 
            message="We encountered errors when trying to submit the form. Please resolve the issue." 
            buttonText="Go to activity input request"
            (bannerAction)="action()"
          >
          </intf-banner>
        </div>

        <div class="m-b-large">
          <intf-banner
            type="warning"
            title="Scheduled Maintenance"
            message="Interfolio will perform scheduled security updates on February 29, 2021 during the hours of 5:00-7:00 AM EST. During this maintenance window the Interfolio platform will be unavailable. Please contact us if you have any questions. Thank you!"
            buttonText="Contact"
            (bannerAction)="action()"
          ></intf-banner>
        </div>

        <intf-banner 
          type="error"
          title="Error Creating the Position"
          message="There was an error creating the position “Asssociate Professor of Engineering, Tenure Track”. Please try creating the position again. If you continue to encounter this error, contact our help desk for assistance."
          buttonText="Try Again"
          (bannerAction)="action()"
        >
        </intf-banner>
      </intf-theme>
    `,
    props: {
      action: () => window.alert('Banner Action'),
    },
  }));
