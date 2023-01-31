import { Inject, Injectable } from '@angular/core';
declare let CKEDITOR: any;

@Injectable()
export class CkEditorTempService {
  ckeditor: any;

  constructor() {
    this.ckeditor = CKEDITOR;
  }

  public replace(content) {
    this.ckeditor.config.toolbar = [
      [
        'PasteText',
        'PasteFromWord',
        '-',
        'Bold',
        'Italic',
        'RemoveFormat',
        '-',
        'NumberedList',
        'BulletedList',
        'Outdent',
        'Indent',
        '-',
        'Link',
        'Unlink',
        '-',
        'Image',
        'SpecialChar',
      ],
    ];

    this.ckeditor.config.removePlugins = 'tableselection';

    return this.ckeditor.replace(content);
  }
}
