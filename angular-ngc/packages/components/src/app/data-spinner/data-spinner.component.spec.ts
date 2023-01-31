import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataSpinnerComponent } from './data-spinner.component';

describe('DataSpinnerComponent', () => {
  let component: DataSpinnerComponent;
  let fixture: ComponentFixture<DataSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataSpinnerComponent],
      imports: [MatProgressSpinnerModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
