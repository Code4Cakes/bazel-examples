export const ButtonStory = () => ({
  template: `
        <intf-theme>
            <h3><a href="https://projects.invisionapp.com/dsm/interfolio/intf-material/nav/60194431a72a130420dff20e/folder/601acfb285118600adfaef76?mode=preview">Design specs</a></h3>
            <mat-divider class="m-t-large m-b-large"></mat-divider>
            
            <h3 class="m-b-medium">Basic Buttons</h3>                
            
            <button mat-button>Basic</button>
            <button mat-button color="primary">Primary</button>
            <button mat-button color="accent">Accent</button>
            <button mat-button color="warn">Warn</button>
            <button mat-button color="primary" disabled>Disabled</button>
            <a mat-button routerLink=".">Link</a>
               
            <mat-divider class="m-t-large m-b-large"></mat-divider>
            
            <h3 class="m-b-medium">Raised Buttons</h3>
            <button mat-raised-button class="m-r-small">Basic</button>
            <button mat-raised-button color="primary" class="m-r-small">Primary</button>
            <button mat-raised-button color="accent" class="m-r-small">Accent</button>
            <button mat-raised-button color="warn" class="m-r-small">Warn</button>
            <button mat-raised-button color="primary" class="m-r-small" disabled>Disabled</button>
            <a mat-raised-button routerLink=".">Link</a> 
            
            <mat-divider class="m-t-large m-b-large"></mat-divider>
            
            <h3 class="m-b-medium">Stroked Buttons</h3>
            <button mat-stroked-button class="m-r-small">Basic</button>
            <button mat-stroked-button color="primary" class="m-r-small">Primary</button>
            <button mat-stroked-button color="accent" class="m-r-small">Accent</button>
            <button mat-stroked-button color="warn" class="m-r-small">Warn</button>
            <button mat-stroked-button color="primary" class="m-r-small" disabled>Disabled</button>
            <a mat-stroked-button routerLink=".">Link</a> 
            
            
            <mat-divider class="m-t-large m-b-large"></mat-divider>
            
            <h3 class="m-b-medium">Flat Buttons</h3>
            <button mat-flat-button class="m-r-small">Basic</button>
            <button mat-flat-button color="primary" class="m-r-small">Primary</button>
            <button mat-flat-button color="accent" class="m-r-small">Accent</button>
            <button mat-flat-button color="warn" class="m-r-small">Warn</button>
            <button mat-flat-button color="primary" class="m-r-small" disabled>Disabled</button>
            <a mat-flat-button routerLink=".">Link</a> 
        </intf-theme>
     `,
});
