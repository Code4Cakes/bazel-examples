import { Injectable, Inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FisCurrentUserService } from '@medicine-cabinet/v2/providers/fisCurrentUser';
import { FisNavigationService } from '@medicine-cabinet/v2/providers/fisNavigation';

@Injectable()
export class AuthenticationResolver implements Resolve<any> {
  constructor(
    @Inject(FisCurrentUserService) public user,
    @Inject(FisNavigationService) public fisNavigation
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.user
      .authenticate()
      .then(() => this.fisNavigation.triggerSidebarResize());
  }
}
