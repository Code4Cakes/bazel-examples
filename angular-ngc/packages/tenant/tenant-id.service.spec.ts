import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { TenantIdService } from '@intf/tenant/tenant-id.service';

describe(TenantIdService.name, () => {
  let service: TenantIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TenantIdService,
        {
          provide: DOCUMENT,
          useValue: { location: { pathname: '/12345/product' } },
        },
      ],
    });
    service = TestBed.get(TenantIdService);
  });

  describe('initializes', () => {
    it('Tenant id from URL', () => {
      expect(service.tenantId).toEqual('12345');
    });
  });
});
