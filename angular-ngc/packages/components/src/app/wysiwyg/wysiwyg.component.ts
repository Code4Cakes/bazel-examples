import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface WYSIWYGSettings {
  menubar: string; // either 'true' or 'false'
  plugins: string;
  toolbar: string;
  toolbar_mode?: string;
  height?: string;
}

@Component({
  selector: 'wysiwyg',
  styleUrls: ['./wysiwyg.component.scss'],
  template: `
    <label
      [id]="fieldName + '-label'"
      datatest-id="label"
    >
      {{ label }}
      <span
        *ngIf="required"
        class="required"
        aria-hidden="true"
      ></span>
    </label>
    <div
      aria-label="text editor"
      class="editor-container"
      [formGroup]="form"
    >
      <p class="description">
       {{ description }}
      </p>
      <editor
        matInput
        [init]="getEditorInitSettings()"
        [formControlName]="fieldName"
        [required]="required"
        [attr.aria-labelledby]="fieldName + '-label'"
        class="editor"
        (onKeyUp)="handleInput($event)"
        (onKeyDown)="handleInput($event)"
        (onInit)="handleInit($event)"
        [class.error]="characterLimitExceeded"
      ></editor>
      <div class="validation-container
        display-flex 
        flex-align-items-space-between"
        [class.flex-direction-row]="!characterLimit"
        [class.flex-direction-row-reverse]="characterLimit"
      >
        <p *ngIf="characterLimit" class="character-count"
          datatest-id="character-count"
        >
        {{ characterCount }}/{{ characterLimit }} characters
        </p>
        <mat-error
          *ngIf="characterLimitExceeded"
          datatest-id="character-limit-error"
        >
          Character limit exceeded.
        </mat-error>
        <mat-error
          datatest-id="required-error"
          *ngIf="form.controls[fieldName]?.hasError('required')"
        >{{ errorMessage }}</mat-error>
        </div>
    </div>
  `,
})
export class WYSIWYGComponent {
  @Input() form: FormGroup; // form the editor is part of 
  @Input() fieldName: string; // formControlName
  @Input() required: boolean;
  @Input() label: string; 
  @Input() type?: string = "title"; // default to min text editor
  @Input() errorMessage?: string;
  @Input() description?: string
  @Input() characterLimit?: number = 0;
  @Input() settings: WYSIWYGSettings;
  characterCount: number = 0;

  getEditorInitSettings() {
    return { 
      ...this.settings, 

      content_css: '/wysiwyg.css',
      base_url: '/npm/node_modules/tinymce', // Root for resources
      suffix: '.min',      // Suffix to use when loading resources
      
      setup: function(editor) {
        // Sets ARIA Title, disables word count
        editor.on('init', function(e) {
          const iFrameEl = e.target.$(e.target.editorContainer).find('iframe')[0];
          iFrameEl.setAttribute('title', 'Rich Text Area. Press ALT-F10 or OPT-F10 to access toolbar');
      
          const wordCountEl = e.target.$(editor.getContainer()).find('button.tox-statusbar__wordcount')[0];
          if (wordCountEl) { 
            wordCountEl.hidden = true;
          };
        });
      
        editor.on('focus', function(e) {
          e.target.editorContainer.classList.toggle('focused');
        });
      
        editor.on('blur', function(e) {
          e.target.editorContainer.classList.toggle('focused');
        });
      }
    }
  }

  get characterLimitExceeded(): boolean {
    return this.characterLimit > 0 && this.characterCount > this.characterLimit;
  }

  handleInput({ event, editor }) {
    this.characterCount = editor.plugins.wordcount.body.getCharacterCount();
  }

  handleInit({ event, editor}) {
    if (this.form.controls[this.fieldName].disabled) {
      this.form.controls[this.fieldName].disable();
    }

    this.characterCount = editor.plugins.wordcount.body.getCharacterCount();
  }
}
