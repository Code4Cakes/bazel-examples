import { Component } from '@angular/core';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { FeatureFlagsTestingModule } from '../testing/src/feature-flags.testing.module';
import { FeatureFlags } from './feature-flags';

@Component({
  selector: 'feature-flag-test-component',
  template: '',
})
class TestComponent {}

describe('FeatureFlagsDirective', () => {
  let service: FeatureFlags;
  const flags = {
    alm: { enabled: true },
    enabledFlag: { enabled: true },
    enabledLegacy: [1],
    disabledFlag: { enabled: false },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [FeatureFlagsTestingModule],
      providers: [],
    });
  });

  function setupFeatureFlags() {
    const injector = getTestBed();
    service = injector.get(FeatureFlags);
    service.featureFlags = flags;
  }

  describe('activates when feature is enabled', () => {
    it('loads view from enabled flag', async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
            <ng-template featureFlags name="enabledFlag">
              <h1>enabled</h1>
            </ng-template>`,
        },
      })
        .compileComponents()
        .then(() => {
          setupFeatureFlags();
          const fixture = TestBed.createComponent(TestComponent);
          const { nativeElement } = fixture.debugElement;

          fixture.detectChanges();
          expect(nativeElement.querySelector('h1')).toBeTruthy();
        });
    }));

    it('loads view from list of enabled flag', async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
            <ng-template featureFlags [name]="['enabledFlag', 'alm']">
              <h1>enabled</h1>
            </ng-template>`,
        },
      })
        .compileComponents()
        .then(() => {
          setupFeatureFlags();
          const fixture = TestBed.createComponent(TestComponent);
          const { nativeElement } = fixture.debugElement;

          fixture.detectChanges();
          expect(nativeElement.querySelector('h1')).toBeTruthy();
        });
    }));

    it('loads view from legacy flag list', async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
            <ng-template featureFlags name="enabledLegacy" findId="1">
              <h1>enabled</h1>
            </ng-template>`,
        },
      })
        .compileComponents()
        .then(() => {
          setupFeatureFlags();
          const fixture = TestBed.createComponent(TestComponent);
          fixture.detectChanges();

          const { nativeElement } = fixture.debugElement;
          expect(nativeElement.querySelector('h1')).toBeTruthy();
        });
    }));
  });

  describe('deactivates when feature is disabled', () => {
    it('removes view when feature is disabled', async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
            <ng-template featureFlags name="disabledFlag">
              <h1>disabled</h1>
            </ng-template>`,
        },
      })
        .compileComponents()
        .then(() => {
          setupFeatureFlags();
          const fixture = TestBed.createComponent(TestComponent);
          const { nativeElement } = fixture.debugElement;

          fixture.detectChanges();
          expect(nativeElement.querySelector('h1')).toBeFalsy();
        });
    }));

    it('removes view when feature in list is disabled', async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
            <ng-template featureFlags [name]="['enabledFlag', 'disabledFlag']">
              <h1>disabled</h1>
            </ng-template>`,
        },
      })
        .compileComponents()
        .then(() => {
          setupFeatureFlags();
          const fixture = TestBed.createComponent(TestComponent);
          const { nativeElement } = fixture.debugElement;

          fixture.detectChanges();
          expect(nativeElement.querySelector('h1')).toBeFalsy();
        });
    }));

    it('displays alternative view if feature disabled', async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
            <ng-template featureFlags name="disabledFlag" [alternative]="alternativeView">
              <h1>disabled</h1>
            </ng-template>
            <ng-template #alternativeView>
              <h2>alt view</h2>
            </ng-template>
          `,
        },
      })
        .compileComponents()
        .then(() => {
          setupFeatureFlags();
          const fixture = TestBed.createComponent(TestComponent);
          const { nativeElement } = fixture.debugElement;

          fixture.detectChanges();
          expect(nativeElement.querySelector('h1')).toBeFalsy();
          expect(nativeElement.querySelector('h2')).toBeTruthy();
        });
    }));
  });
});
