import { DOCUMENT } from '@angular/common';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { EnvironmentModule } from '@intf/environments/src/environment.module';
import { FeatureFlagsModule } from './feature-flags.module';
import { FeatureFlags } from './feature-flags';
import { IFeatureFlags } from './feature-flags.interface';

describe('FeatureFlags', () => {
  let testScheduler;
  let service: FeatureFlags;
  const mockUrl = 'https://www.example.com';
  const response: IFeatureFlags[] = [
    {
      alm: { enabled: true },
      far2rpt: { enabled: true },
      ihop: { enabled: false },
      ids: { enabled: false },
      override: { enabled: true },
    },
  ];
  const flags = {
    ...response[0],
    institutionalHomePage: { enabled: true },
    override: { enabled: false },
    legacyList: [1],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        EnvironmentModule.forRoot({
          FEATURE_FLAGS: {
            override: { enabled: false },
            institutionalHomePage: { enabled: true },
            legacyList: [1],
          },
        }),
        FeatureFlagsModule.forRoot(),
      ],
      providers: [
        FeatureFlags,
        {
          provide: DOCUMENT,
          useValue: { location: { href: 'url.test', pathname: '/1' } },
        },
      ],
    });
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    const injector = getTestBed();
    service = injector.get(FeatureFlags);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('feature flags init', () => {
    it('gets list of flags', () => {
      testScheduler.run(() => {
        const spy = spyOn(service, 'getFeatureFlags$');

        service.initialize$(mockUrl);
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('features request', () => {
    it('gets a list of features', () => {
      testScheduler.run(helpers => {
        const { cold, expectObservable } = helpers;
        spyOn(service.http, 'getFeatures$').and.returnValue(
          cold('a', { a: response })
        );

        expectObservable(service.getFeatureFlags$(mockUrl)).toBe('b', {
          b: flags,
        });

        testScheduler.flush();
        expect(service.featureFlags).toEqual(flags);
      });
    });

    it('does not call api when url is empty', () => {
      testScheduler.run(helpers => {
        const { expectObservable } = helpers;
        const spy = spyOn(service.http, 'getFeatures$');

        expectObservable(service.getFeatureFlags$('')).toBe('(a|)', {
          a: {
            override: { enabled: false },
            institutionalHomePage: { enabled: true },
            legacyList: [1],
          },
        });

        testScheduler.flush();
        expect(spy).not.toHaveBeenCalled();
      });
    });

    it('handles errors from the api', () => {
      testScheduler.run(helpers => {
        const { expectObservable } = helpers;
        spyOn(service.http, 'getFeatures$').and.returnValue(
          throwError({ message: 'mock error message' })
        );

        expectObservable(service.getFeatureFlags$(mockUrl)).toBe('(a|)', {
          a: {
            error: 'mock error message',
          },
        });
      });
    });

    it('loads in overrides even on error', () => {
      testScheduler.run(helpers => {
        const { expectObservable } = helpers;
        spyOn(service.http, 'getFeatures$').and.returnValue(
          throwError({ message: 'mock error message' })
        );

        expectObservable(service.getFeatureFlags$(mockUrl)).toBe('(a|)', {
          a: {
            error: 'mock error message',
          },
        });

        expect(service.featureFlags).toEqual({
          institutionalHomePage: { enabled: true },
          override: { enabled: false },
          legacyList: [1],
        });
      });
    });
  });

  describe('get feature is on', () => {
    beforeEach(() => {
      service.featureFlags = flags;
    });

    it('should return true if all passed flags are enabled', () => {
      expect(service.getFlag(['alm'])).toEqual(true);
      expect(service.getFlag(['far2rpt'])).toEqual(true);
      expect(service.getFlag(['alm', 'far2rpt'])).toEqual(true);
    });

    it('should return false if all passed flags are disabled', () => {
      expect(service.getFlag(['ihop'])).toEqual(false);
      expect(service.getFlag(['ids'])).toEqual(false);
      expect(service.getFlag(['ihop', 'ids'])).toEqual(false);
    });

    it('should return false if at least one flag is not enabled', () => {
      expect(service.getFlag(['alm'])).toEqual(true);
      expect(service.getFlag(['ihop'])).toEqual(false);
      expect(service.getFlag(['alm', 'ihop'])).toEqual(false);
    });

    it('should return true if given flag is enabled', () => {
      expect(service.getFlag('alm')).toEqual(true);
    });

    it('should return false if given flag is not enabled', () => {
      expect(service.getFlag('ihop')).toEqual(false);
    });

    it('should return false if the flag does not exist', () => {
      expect(service.getFlag('unknown_flag')).toEqual(false);
    });

    it('adds flags from environment', () => {
      expect(service.getFlag('institutionalHomePage')).toEqual(true);
    });

    it('allows flags to be overridden by environment', () => {
      expect(service.getFlag('override')).toEqual(false);
    });

    it('loads flags from legacy list', () => {
      expect(service.getFlag('legacyList', '1')).toEqual(true);
    });
  });
});
