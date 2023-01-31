import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as axe from 'axe-core';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('init', () => {
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
});
