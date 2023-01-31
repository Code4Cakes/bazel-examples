import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FeatureFlagsTestingModule } from '../testing/src/feature-flags.testing.module';
import { FeatureFlagsGuard } from './feature-flags.guard';
import { FeatureFlags } from './feature-flags';

describe('FeatureFlagsGuard', () => {
  let guard: FeatureFlagsGuard;
  let service: FeatureFlags;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FeatureFlagsTestingModule],
      providers: [
        FeatureFlagsGuard,
        {
          provide: DOCUMENT,
          useValue: { location: { href: 'url.test', pathname: '/1' } },
        },
      ],
    });

    const injector = getTestBed();
    guard = injector.get(FeatureFlagsGuard);
    service = injector.get(FeatureFlags);

    service.featureFlags = {
      interfolioDataService: [1],
      alm: { enabled: false },
      far2rpt: { enabled: true },
      enabledFlag: { enabled: true },
      disabledFlag: { enabled: false },
    };
  });

  beforeEach(() => {
    service.initialize$('');
  });

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  describe('guard activation', () => {
    it('loads route if use has access to feature', () => {
      const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
      route.data = { flag: 'enabledFlag' };

      expect(guard.canActivate(route)).toBeTruthy();
    });

    it('loads route if app has access to n flags', () => {
      const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
      route.data = { flag: ['enabledFlag', 'far2rpt'] };

      expect(guard.canActivate(route)).toBeTruthy();
    });

    it('loads route if user has access to legacy flags', () => {
      const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
      route.data = { flag: 'interfolioDataService' };
      route.params = { tenantId: 1 };

      expect(guard.canActivate(route)).toBeTruthy();
    });
  });

  describe('guard deactivation', () => {
    it('redirects if user does not have access', inject(
      [Router],
      (router: Router) => {
        spyOn(router, 'navigate').and.stub();
        const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
        route.data = { flag: 'interfolioDataService' };
        route.params = { tenantId: 2 };

        expect(guard.canActivate(route)).toBeFalsy();
        expect(router.navigate).toHaveBeenCalledWith(['/2']);
      }
    ));

    it('redirects to home route if user does not have tenant', inject(
      [Router],
      (router: Router) => {
        spyOn(router, 'navigate').and.stub();
        const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
        route.data = { flag: 'disabledFlag' };

        expect(guard.canActivate(route)).toBeFalsy();
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      }
    ));

    it('redirects user if n flags is disabled', inject(
      [Router],
      (router: Router) => {
        spyOn(router, 'navigate').and.stub();
        const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
        route.data = { flag: ['enabledFlag', 'disabledFlag'] };

        expect(guard.canActivate(route)).toBeFalsy();
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      }
    ));

    it('allows for a manual redirect', inject([Router], (router: Router) => {
      spyOn(router, 'navigate').and.stub();
      const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
      route.data = { flag: 'disabledFlag', redirect: '/redirect/route' };

      expect(guard.canActivate(route)).toBeFalsy();
      expect(router.navigate).toHaveBeenCalledWith(['/redirect/route']);
    }));
  });
});
