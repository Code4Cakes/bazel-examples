export default {
  controller: 'PagesHomeController',
  template: `
    <div>
      <h4>
        {{::$ctrl.getPageName()}}
      </h4>
      
      <h5>Medicine Cabinet component</h5>
      <div
        id="position-open-date"
        byc-datepicker
        ng-model="$ctrl.exampleModel"
       ></div>
       
       <button
         intf-btn="link" 
         size="sm" 
         text="Dashboard"
         ng-click="$ctrl.navigateToDashboard()"
         class="m-b-medium"
       ></button>
       
      <work-items></work-items>
    </div>
  `,
};
