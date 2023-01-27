export default `
  <h2 class="font-size-larger font-weight-bold">
    User Details
  
    <h3>User Name</h3>
    <h4>
      {{ ::$ctrl.userName() }}
    </h4>
  
    <button
      intf-btn="primary"
      size="sm"
      text="Back"
      ng-click="::$ctrl.goBack()"
    ></button>
  </h2>
`;
