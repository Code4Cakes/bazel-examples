export default `
<div>
  <h4>
    {{ getPageName() }}
  </h4>
  <button
    intf-btn="primary" 
    size="sm" 
    text="Navigate to AngularJS Admin Page"
    ng-click="navigateToAngularJSPage('admin')"
  ></button>
  <button
    intf-btn="primary" 
    size="sm" 
    text="Navigate to AngularJS User Page"
    ng-click="navigateToAngularJSPage('user')"
  ></button>
  <button
    intf-btn="primary" 
    size="sm" 
    text="Navigate to Angular Page"
    ng-click="navigateToAngularPage()"
  ></button>
</div>
`;
