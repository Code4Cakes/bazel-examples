import { Router } from '@angular/router';

export default class {
  router: Router;
  pageName: string;
  exampleModel = {};

  constructor(router) {
    this.pageName = 'Legacy Home Page';
    this.router = router;
  }

  getPageName() {
    return this.pageName;
  }

  navigateToDashboard() {
    this.router.navigate(['/']);
  }
}
