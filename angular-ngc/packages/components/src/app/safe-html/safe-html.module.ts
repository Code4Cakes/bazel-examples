import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './safe-html.pipe';

/*
 For importing to legacy code, requires this in src-legacy/BUILD.bazel:
 "@npm//dompurify:dompurify.umd.js"
*/
@NgModule({
  imports: [CommonModule],
  declarations: [SafeHtmlPipe],
  exports: [SafeHtmlPipe],
  providers: [SafeHtmlPipe]
})
export class SafeHtmlPipeModule { }
