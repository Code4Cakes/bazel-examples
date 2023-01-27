import { downgradeInjectable } from '@angular/upgrade/static';
import { Router } from '@angular/router';
import PagesSettingsController from './controller';

export default angular
  .module('home/pages/settings', ['ng'])
  .factory('$router', downgradeInjectable(Router))
  .controller('PagesSettingsController', PagesSettingsController);
