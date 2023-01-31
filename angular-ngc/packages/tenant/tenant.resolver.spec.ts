import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { TenantResolver } from '@intf/tenant/tenant.resolver';
import { EnvironmentModule } from '@intf/environments/src/environment.module';

describe('TenantResolver', () => {
  const routerSpy = { navigate: jasmine.createSpy('navigate') };
  let service: TenantResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        EnvironmentModule.forRoot({
          ACCOUNT_URL: 'https://account-dev.interfolio.com',
        }),
      ],
      providers: [
        TenantResolver,
        {
          provide: DOCUMENT,
          useValue: { location: { href: 'url.test', pathname: '/' } },
        },
        { provide: Router, useValue: routerSpy },
      ],
    });
    service = TestBed.get(TenantResolver);
    // @ts-ignore
    window.gon = { tenantId: '' };
  });

  describe('canActivate', () => {
    it('navigates to the base url if there is a tenant id', () => {
      // @ts-ignore
      window.gon.tenantId = '10607';
      service.canActivate();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/10607']);
    });

    it('redirects to account otherwise', () => {
      const document = TestBed.get(DOCUMENT);
      service.canActivate();

      expect(document.location.href).toEqual(
        'https://account-dev.interfolio.com'
      );
    });
  });
});
