export const TypographyStory = () => ({
  template: `
        <intf-theme>
            <h3><a href="https://projects.invisionapp.com/dsm/interfolio/intf-material/nav/60194431a72a130420dff20e/folder/60194431a72a13cb88dff208?mode=preview">Design specs</a></h3>
            
            <mat-divider class="m-t-large m-b-large"></mat-divider>
            
            <h1>Page Title (h1 or .page-title)</h1>
            <h2>Section Header (h2 or .section-header)</h2>
            <h3>Sub Section Header (h3 or .sub-section-header)</h3>
            <h4>Paragraph Header (h4 or .paragraph-header)</h4>
            <h5>Sub Paragraph Header (h5 or .sub-paragraph-header)</h5>
            <div class="body-medium">Body Medium (.body-medium)</div>
            <div class="body-small">Body Small (.body-small)</div>
            
            <mat-divider class="m-t-large m-b-large"></mat-divider>
            
            <div class="box text-center">.text-center</div>            
            <div class="box text-right">.text-right</div>            
            <div class="text-justify">.text-justify Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>            
            
            <mat-divider class="m-t-large m-b-large"></mat-divider>
            
            <h4 class="text-error ">Text error (.text-error)</h4>            
        </intf-theme>
     `,
  styles: [
    `
            .box {
                background-color: #6AB2D9;
                color: white;
                height: 40px;   
                margin-right: 20px;         
                line-height: 40px;
            }
            
            .text-justify {
                background-color: #6AB2D9;
                color: white;
            }
        `,
  ],
});
