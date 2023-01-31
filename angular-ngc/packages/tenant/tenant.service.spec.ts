import { TestBed } from '@angular/core/testing';
import { TenantService } from './tenant.service';
import {
  ActivatedRouteSnapshot,
  Router,
  RoutesRecognized,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

export function emitRoutesRecognizedEvent(url) {
  const routeEvent = new RoutesRecognized(1, url, url, {
    url,
    root: new ActivatedRouteSnapshot(),
  });

  TestBed.get(Router).events.next(routeEvent);
}

describe(TenantService.name, () => {
  let service: TenantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [TenantService],
    });
    service = TestBed.get(TenantService);
  });

  describe('tenantId', () => {
    it('parses first path segment from url and sets tenantId', () => {
      const testTenantId = '123';
      const testUrl = `/${testTenantId}/test1/test2/`;

      expect(service.tenantId).toBeUndefined();

      emitRoutesRecognizedEvent(testUrl);

      expect(service.tenantId).toEqual(testTenantId);
    });

    it('it sets empty string if path segment empty', () => {
      const testUrl = `/`;

      expect(service.tenantId).toBeUndefined();

      emitRoutesRecognizedEvent(testUrl);

      expect(service.tenantId).toEqual('');
    });
  });
});
