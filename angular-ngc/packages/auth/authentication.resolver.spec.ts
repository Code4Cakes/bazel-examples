import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { EnvironmentModule } from '@intf/environments/src/environment.module';
import { AuthenticationResolver } from './authentication.resolver.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FisCurrentUserService } from '@medicine-cabinet/v2/providers/fisCurrentUser';
import { FisNavigationService } from '@medicine-cabinet/v2/providers/fisNavigation';

describe('AuthenticationResolver', () => {
  let router: Router;
  let service: AuthenticationResolver;
  const authPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Success!');
    }, 250);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        EnvironmentModule.forRoot({
          ACCOUNT_URL: 'https://account-dev.interfolio.com',
        }),
        RouterTestingModule,
      ],
      providers: [
        AuthenticationResolver,
        {
          provide: FisCurrentUserService,
          useValue: {
            authenticate: jasmine
              .createSpy('authenticate')
              .and.returnValue(authPromise),
          },
        },
        {
          provide: FisNavigationService,
          useValue: {
            triggerSidebarResize: jasmine.createSpy('triggerSidebarResize'),
          },
        },
      ],
    });
    service = TestBed.get(AuthenticationResolver);
    router = TestBed.get(Router);
  });

  describe('resolve', () => {
    it('authenticates the user', () => {
      service.resolve(new ActivatedRouteSnapshot());

      expect(service.user.authenticate).toHaveBeenCalled();
    });

    it('triggers the sidebar resize', () => {
      service.resolve(new ActivatedRouteSnapshot());
      authPromise.then(() => {
        expect(service.fisNavigation.triggerSidebarResize).toHaveBeenCalled();
      });
    });
  });
});
