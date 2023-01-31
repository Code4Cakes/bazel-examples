/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IntfBreadcrumbsModule } from '@intf/components/intf-breadcrumbs';
import { TenantIdService } from '@intf/tenant/tenant-id.service';
import { EnvironmentModule } from '@intf/environments/src/environment.module';
import * as axe from 'axe-core';
import { PageHeaderComponent } from './page-header.component';

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IntfBreadcrumbsModule,
        EnvironmentModule.forRoot({
          HOME_API: 'https://home-api-test.interfolio.com',
          FEATURE_FLAGS: {},
        }),
      ],
      declarations: [PageHeaderComponent],
      providers: [TenantIdService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be accessible', async () => {
    component.pageTitle = 'Testing Title';
    fixture.detectChanges();
    await axe.run(fixture.nativeElement).then(results => {
      results.violations.forEach(v => console.error(v));
      expect(results.violations.length).toBe(0);
    });
  });
});
