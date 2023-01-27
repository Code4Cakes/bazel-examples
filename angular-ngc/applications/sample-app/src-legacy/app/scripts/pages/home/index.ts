import { downgradeInjectable } from '@angular/upgrade/static';
import { Router } from '@angular/router';
import intfDatepicker from '@medicine-cabinet/legacy/modules/directives/datepicker';
import workItems from '../../modules/work_items';
import PagesHomeController from './controller';
import pagesHome from './component';

export default angular
  .module('home/pages/home', [intfDatepicker.name, workItems.name])
  .controller('PagesHomeController', PagesHomeController)
  .component('pagesHome', pagesHome)
  .factory('router', downgradeInjectable(Router));
