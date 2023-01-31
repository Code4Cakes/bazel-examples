import { TestBed } from '@angular/core/testing';

import { IntfTableDensityTogglerService } from './intf-table-density-toggler.service';

describe('ViewDensityTogglerService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [IntfTableDensityTogglerService],
    })
  );

  it('should be created', () => {
    const service: IntfTableDensityTogglerService = TestBed.get(
      IntfTableDensityTogglerService
    );
    expect(service).toBeTruthy();
  });
});
