import { TestBed, getTestBed } from '@angular/core/testing';
import { EnvironmentModule } from '@intf/environments/src/environment.module';
import { Environment } from './environment';

describe('environment service', () => {
  let injector: TestBed;
  let service: Environment;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        EnvironmentModule.forRoot({
          TEST_API: 'http://test-api-dev.interfolio.com',
        }),
      ],
      providers: [Environment],
    });
    injector = getTestBed();
    service = injector.get(Environment);
  });

  describe('sets environment config', () => {
    it('sets default config provided by module', () => {
      expect(service.config).toEqual({
        TEST_API: 'http://test-api-dev.interfolio.com',
      });
    });

    it('overwrites configs when updated', () => {
      const exampleUrl = 'http://example.interfolio.com';

      service.updateConfig({ TEST_API: exampleUrl });
      expect(service.config).toEqual({ TEST_API: exampleUrl });
    });
  });
});
