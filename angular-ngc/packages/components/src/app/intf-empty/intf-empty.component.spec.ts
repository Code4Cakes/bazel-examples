import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import * as axe from 'axe-core';
import { IntfEmptyComponent } from './intf-empty.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

describe('IntfEmptyComponent', () => {
  let component: IntfEmptyComponent;
  let fixture: ComponentFixture<IntfEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzEmptyModule],
      declarations: [IntfEmptyComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntfEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be accessible', async () => {
    await axe.run(fixture.nativeElement).then(results => {
      results.violations.forEach(v => console.error(v));
      expect(results.violations.length).toBe(0);
    });
  });
});
