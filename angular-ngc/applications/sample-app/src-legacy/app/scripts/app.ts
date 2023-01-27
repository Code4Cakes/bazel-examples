import * as jquery from 'jquery';

declare global {
  interface Window {
    $: any;
    jQuery: any;
    gon: Gon;
    myVar: string;
    module: any;
    analytics: any;
    console: any;
    FormData: any;
    FileReader: any;
    CKEDITOR_BASEPATH: string;
    DISABLE_FORM_ENCODING: boolean;
    d3: any;
    dropzoneInstance: any;
    JSONEditor: any;
    Spinner: any;
  }
}

// @ts-ignore
window.$ = window.jQuery = jquery.default || jquery;

import 'angular-ui-bootstrap';
import '@uirouter/angularjs';
import { $locationShim } from '@angular/common/upgrade';
import { downgradeInjectable } from '@angular/upgrade/static';
import intfDatepicker from '@medicine-cabinet/legacy/modules/directives/datepicker';
import intfButtons from '@medicine-cabinet/legacy/modules/buttons';
import routes from './routes';
import AppController from './app_controller';
import pagesHome from './pages/home';
import pagesSettings from './pages/settings';
import pagesAdmin from './pages/admin';
import pagesUser from './pages/user';
import run from './run';

export const app = angular
  .module('sample-app-legacy', [
    'ng',
    'ui.bootstrap',
    'ui.router',
    intfButtons.name,
    pagesHome.name,
    pagesAdmin.name,
    pagesSettings.name,
    pagesUser.name,
    intfDatepicker.name,
  ])
  .factory('$location', downgradeInjectable($locationShim))
  .controller('AppController', AppController)
  .config(routes)
  .run(run);
