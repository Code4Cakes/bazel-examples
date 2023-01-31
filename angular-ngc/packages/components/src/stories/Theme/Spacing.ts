export const SpacingStory = () => ({
  template: `
        <intf-theme>
          <h3><a href="https://projects.invisionapp.com/dsm/interfolio/intf-material/nav/60194431a72a130420dff20e/folder/6019b1a1dbefdc2232b70f6b?mode=preview">Design specs</a></h3>
          <mat-divider></mat-divider>
            <h5>To add spacing declaratively in the html there are a number of utility classes that can be used:</h5>
            <h5>CSS Class syntax: <br>[property]-[direction]-[size]</h5>
            <br>
            <div>property can be p (padding) | m (margin)</div>
            <div>direction can be: t (top) | r (right) | b (bottom) | l (left) </div>
            <div>direction is optional</div>
            <div>size can be: tiny | smaller | small | medium | regular | large | larger | largest | huge | jumbo | none</div>
            <div>a size of none sets the corresponding property to 0</div>
            <br>
            <div>e.g. class="p-l-small" -> small left padding </div>
            <div>e.g. class="m-large" -> large margin </div>
            <div>e.g. class="m-none" -> removes margin </div>
            <div>e.g. class="m-t-none" -> removes top margin </div>
        </intf-theme>
     `,
});
