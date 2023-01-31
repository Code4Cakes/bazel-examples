// In content.html use:
// <div [innerHTML]="post.content.rendered | safeHtml " class="entry-body"></div>

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as DOMPurify from 'dompurify';

@Pipe({ 
  name: 'safeHtml' 
})
export class SafeHtmlPipe implements PipeTransform {
  
  constructor(private sanitized: DomSanitizer) {
    this.addHooks();
  }

  transform(value: string) {
    return this.sanitized.bypassSecurityTrustHtml(this.sanitize(value));
  }

  private sanitize(value: string): string {
    return DOMPurify.sanitize(value);
  }

  private addHooks(): void {
    const TEMPORARY_ATTRIBUTE = 'data-temp-href-target';

    DOMPurify.addHook('beforeSanitizeAttributes', function (node) {
        if (node.tagName === 'A') {
            if (!node.hasAttribute('target')) {
                node.setAttribute('target', '_self');
            }

            if (node.hasAttribute('target')) {
                node.setAttribute(TEMPORARY_ATTRIBUTE, node.getAttribute('target'));
            }
        }
    });

    DOMPurify.addHook('afterSanitizeAttributes', function (node) {
        if (node.tagName === 'A' && node.hasAttribute(TEMPORARY_ATTRIBUTE)) {
            node.setAttribute('target', node.getAttribute(TEMPORARY_ATTRIBUTE));
            node.removeAttribute(TEMPORARY_ATTRIBUTE);
            if (node.getAttribute('target') === '_blank') {
                node.setAttribute('rel', 'noopener');
            }
        }
    });
  }
}
