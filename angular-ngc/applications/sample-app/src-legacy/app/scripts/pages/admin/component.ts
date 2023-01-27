export default {
  controller: 'PagesAdminController',
  template: `
    <div>
      <h4>
        {{::$ctrl.getPageName()}}
      </h4>
      
       <button
         intf-btn="link" 
         size="sm" 
         text="Back"
         ng-click="$ctrl.goBack()"
       ></button>
    </div>
  `,
};
