import olarkComponent from './component';
import * as angular from 'angular';

export default (angular.default || angular)
  .module('olark', [])
  .component('olark', olarkComponent);
