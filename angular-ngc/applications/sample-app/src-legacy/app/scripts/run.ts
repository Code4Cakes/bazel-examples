/*@ngInject*/
export default function($rootScope) {
  // Gon was used in by legacy applications to store window level vars provided
  // by the server. Legacy code and medicine cabinet modules rely on gon. We add
  // it here to the rootscope for access in the templates. window.gon is set in
  // app.js via the globals module.
  $rootScope.gon = window.gon;

  $rootScope.$on('$stateChangeStart', onStateChangeStart);
  $rootScope.$on('$stateChangeSuccess', onStateChangeSuccess);
  $rootScope.$on('$stateChangeFailure', onStateChangeFailure);

  // Injects monitoring like New Relic and setup analytic scripts
  setupAnalyticsAndMonitoring();

  function onStateChangeStart(e, toState, toParams, fromState, fromParams) {
    // Flag to show spinner while resolves finish
    if (toState.resolve) {
      $rootScope.pageIsLoading = true;
    }

    // Dynamically change the page title and body id upon state change
    $rootScope.pageTitle = toState.data && toState.data.pageTitle;
    $rootScope.pageId = toState.data && toState.data.pageId;
  }

  function onStateChangeSuccess(e, toState) {
    // Hide spinner
    delete $rootScope.pageIsLoading;
  }

  function onStateChangeFailure(e, toState) {
    // Hide spinner
    delete $rootScope.pageIsLoading;
  }

  function setupAnalyticsAndMonitoring() {
    // Ensure analytics are only initialized once
    // if (!analytics.initialized) analytics.initialize();
  }

  // Prevent default on all # hrefs
  $(document).on('click', 'a[href="#"]', e => {
    e.preventDefault();
  });
}
