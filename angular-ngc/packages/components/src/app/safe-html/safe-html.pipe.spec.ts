import { async, getTestBed, TestBed } from "@angular/core/testing";
import { BrowserModule, DomSanitizer } from "@angular/platform-browser";
import { SafeHtmlPipe } from "./safe-html.pipe";

describe(SafeHtmlPipe.name, () => {
  let pipe: SafeHtmlPipe;
  let injector: TestBed;
  let sanitizer: DomSanitizer;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BrowserModule,
        SafeHtmlPipe
      ]
    });
    injector = getTestBed();
    pipe = injector.get(SafeHtmlPipe);
    sanitizer = injector.get(DomSanitizer);
  }));
  
  it('creates', () => {
    expect(pipe).toBeDefined();
  });

  it('outputs same string when html is already clean', () => {
    const s = '<p> I am a string</p>';
    expect(pipe.transform(s)['changingThisBreaksApplicationSecurity']).toBe(s);
  });

  it('removes script tags and random tags', () => {
    const els = [
      '<p>not script<script type="ts">alert("hi")</script></p>',
      '<x>i am an element with a random tag</x>',
      '<bgsound draggable="true" ondrag="alert(1)">test</bgsound>',
    ];

    const cleanEls = [
      '<p>not script</p>',
      'i am an element with a random tag',
      'test',
    ];

    els.forEach((el, i) => {
      expect(pipe.transform(el)['changingThisBreaksApplicationSecurity']).toBe(cleanEls[i]);
    });
  });

  it('sanitizes event listeners and potential xss', () => {
    const els = [
      '<img src=javascript:alert(1)>i have javascript',
      '<menu id=x contextmenu=x onshow=alert(1)>rightclick me',
      '<a draggable="true" ondrag="alert(1)">test</a>',
      '<big id=x tabindex=1 onactivate=alert(1)></big>',
    ];
    
    els.forEach(el => {
      expect(pipe.transform(el)['changingThisBreaksApplicationSecurity'].includes('alert')).toBeFalsy();
    });
  });

  describe('adding target attributes for <a> tags', () => {
    it('adds rel=nooponer for links with target="_blank"', () => {
      const el = '<a href="test.com" target="_blank">test link</a>';
      const expected = '<a href="test.com" target="_blank" rel="noopener">test link</a>';
      expect(pipe.transform(el)['changingThisBreaksApplicationSecurity']).toBe(expected);
    });

    it('adds target="_self" for links without a target', () => {
      const el = '<a href="test.com">test link</a>';
      const expected = '<a href="test.com" target="_self">test link</a>';
      expect(pipe.transform(el)['changingThisBreaksApplicationSecurity']).toBe(expected);
    });
  });
})
