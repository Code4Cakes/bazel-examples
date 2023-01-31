export const OverviewStory = () => ({
  template: `
            <intf-theme>
              <h4>To use theming in your application, wrap the main content in the  intf-theme tag</h4>
              <code>&lt;intf-theme&gt;...main content goes here &lt;/intf-theme&gt;</code>
              <br><br>
              <h5>For more information consult the 
              <a href="https://projects.invisionapp.com/dsm/interfolio/intf-material/nav/60194431a72a130420dff20e/folder/60194431a72a134b65dff20b?mode=preview">
                design system
              </a>
              </h5>
            </intf-theme>
        `,
  styles: [
    `
        code { 
            background-color: lightgray;
        }
            
        .grid-container {
            height: calc(100vh - 70px);
        }
      
        .column {
            height: 100%;
        }
        
        .column div {
            background-color: rgba(12, 131, 127, 0.35);
            height: 100%;
        }

        .box-container {
           width: 100%;
           position: absolute;
           top: 0;
           height: 100vh;
        }
        
        .box {
            height: 80px;
            background-color: purple;
            font-size: 16px;
            color: white;
            text-align: center;
        }
        `,
  ],
});
