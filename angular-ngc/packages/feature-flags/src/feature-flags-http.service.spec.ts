import { getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EnvironmentModule } from '@intf/environments/src/environment.module';
import { Environment } from '@intf/environments/src/environment';
import { FeatureFlagsHttpService } from './feature-flags-http.service';

describe('Feature Flags Http Service', () => {
  let injector: TestBed;
  let service: FeatureFlagsHttpService;
  let environment: Environment;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        EnvironmentModule.forRoot({
          FLAG_API: 'https://logic-dev.interfolio.com/byc',
        }),
      ],
      providers: [FeatureFlagsHttpService, Environment],
    });
    injector = getTestBed();
    service = injector.get(FeatureFlagsHttpService);
    httpMock = injector.get(HttpTestingController);
    environment = injector.get(Environment);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get feature flags', () => {
    it('gets a list of feature flags', () => {
      const url = `${environment.config.FLAG_API}/1/features`;

      service.getFeatures$(url).subscribe();
      const http = httpMock.expectOne({
        method: 'GET',
        url: 'https://logic-dev.interfolio.com/byc/1/features',
      });

      http.flush({});
    });
  });
});
