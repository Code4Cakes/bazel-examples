import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import * as axe from 'axe-core';
import { WYSIWYGComponent } from './wysiwyg.component';
import { CommonModule } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { By } from '@angular/platform-browser';

describe('WYSIWYGComponent', () => {
  let component: WYSIWYGComponent;
  let fixture: ComponentFixture<WYSIWYGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        EditorModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule
      ],
      declarations: [WYSIWYGComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WYSIWYGComponent);
    component = fixture.componentInstance;

    const testForm = new FormGroup({
      title: new FormControl('Test title', Validators.required)
    });

    component.form = testForm;
    component.fieldName = 'title';
    component.required = true;
    component.label = "I am the test title";
    component.settings = {
      menubar: 'false',
      plugins: 'charmap wordcount',
      toolbar: 'bold italic underline subscript superscript | removeformat charmap',
    };

    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('is accessible', async () => {
    await axe.run(fixture.nativeElement).then(results => {
      results.violations.forEach(v => console.error(v));
      expect(results.violations.length).toBe(0);
    });
  });

  it('renders label', () => {
    const el = fixture.debugElement.query(By.css('[datatest-id="label"'));
    
    expect(el.nativeElement.textContent.trim()).toBe('I am the test title');
  });

  describe('character count rendering', () => {
    const editor = {
      plugins: {
        wordcount: {
          body: {
            getCharacterCount: () => {
              return 300;
            }
          }
        }
      }
    };

    it('shows error when character limit is exceeded', () => {
      component.characterLimit = 200;
      component.handleInput({ event: {},  editor });
      fixture.detectChanges();

      const el = fixture.debugElement.query(By.css('[datatest-id="character-limit-error"]'));

      expect(el).toBeTruthy();
    });

    it('renders character count if there is a limit', () => {
      editor.plugins.wordcount.body.getCharacterCount = () => {
        return 100
      };
      component.characterLimit = 200;
      component.handleInput({ event: {}, editor });
      fixture.detectChanges();

      const el = fixture.debugElement.query(By.css('[datatest-id="character-count"]'));

      expect(el).toBeTruthy();
      expect(el.nativeElement.textContent.trim()).toBe('100/200 characters');
    });

    it('does not render character count when no limit is set', () => {
      const el = fixture.debugElement.query(By.css('[datatest-id="character-count"]'));

      expect(el).toBeFalsy();
    });
  })

  it('shows required error when title is blank', () => {
    component.form.controls.title.setValue('');
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('[datatest-id="required-error"]'));
    expect(el).toBeTruthy();
  });
});
