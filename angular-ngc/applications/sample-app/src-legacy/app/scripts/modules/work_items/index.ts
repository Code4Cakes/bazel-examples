import workItems from './component';
import WorkItemsController from './controller';

export default angular
  .module('home/modules/work_items', [])
  .controller('WorkItemsController', WorkItemsController)
  .component('workItems', workItems);
