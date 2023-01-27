import PagesAdminController from './controller';
import pagesAdmin from './component';

export default angular
  .module('home/pages/admin', [])
  .controller('PagesAdminController', PagesAdminController)
  .component('pagesAdmin', pagesAdmin);
