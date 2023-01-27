export default class {
  pageName: string;
  exampleModel = {};

  constructor() {
    this.pageName = 'Admin Component Page';
  }

  getPageName() {
    return this.pageName;
  }

  goBack() {
    window.history.back();
  }
}
