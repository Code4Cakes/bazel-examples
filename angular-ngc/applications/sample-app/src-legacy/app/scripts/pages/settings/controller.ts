export default function($scope, $state, $router) {
  $scope.getPageName = () => {
    return 'Settings template route';
  };

  $scope.navigateToAngularJSPage = (route: string) => {
    $state.go(route);
  };

  $scope.navigateToAngularPage = () => {
    $router.navigate(['/redux']);
  };
}
