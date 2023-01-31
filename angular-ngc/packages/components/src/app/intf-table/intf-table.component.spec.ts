import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import * as axe from 'axe-core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IntfTableComponent } from './intf-table.component';
import { IntfEmptyModule } from '@intf/components/intf-empty';
import { IntfIconModule } from '@intf/components/intf-icon';

describe('IntfTableComponent', () => {
  let component: IntfTableComponent;
  let fixture: ComponentFixture<IntfTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzTableModule, IntfEmptyModule, IntfIconModule],
      declarations: [IntfTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntfTableComponent);
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
