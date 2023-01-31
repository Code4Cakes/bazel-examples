import { DOCUMENT } from '@angular/common';
import { Environment } from '@intf/environments/src/environment';
import { PdfGenerator } from '@intf/pdf-generator/pdf-generator.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EnvironmentModule } from '@intf/environments/src/environment.module';

class DocumentMock {
  public element = {
    href: '',
    download: '',
    click: () => {},
    location: {
      hostname: 'facultysearch.interfolio.com',
    },
  };

  createElement(tag: string): any {
    return this.element;
  }
}

describe(PdfGenerator.name, () => {
  let httpMock: HttpTestingController;
  let service: PdfGenerator;
  let document: DocumentMock;

  beforeEach(() => {
    document = new DocumentMock();
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        EnvironmentModule.forRoot({
          PDF_EXPORTER_API: 'https://pdf-exporter-api.interfolio.com',
        }),
      ],
      providers: [PdfGenerator, { provide: DOCUMENT, useValue: document }],
    });
    service = TestBed.get(PdfGenerator);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  describe('generate', () => {
    it('makes request to pdf-exporter-api', () => {
      service.generate('body').subscribe();
      const req = httpMock.expectOne({
        method: 'POST',
        url: 'https://pdf-exporter-api.interfolio.com/pdf',
      });

      req.flush({});
    });

    it('constructs the request with head and body in an html doc', () => {
      const body = '<h1>My Document</h1>';
      const head = '<link type="text/css" href="jedi-mind-trick.css">';
      const title = 'my-document.pdf';

      service.generate(body, head, title).subscribe();
      const req = httpMock.expectOne({
        method: 'POST',
        url: 'https://pdf-exporter-api.interfolio.com/pdf',
      });
      req.flush({});
      const content = req.request.body.updates.filter(
        item => item.param === 'html'
      )[0];

      expect(content.value).toContain(head);
      expect(content.value).toContain(body);

      expect(content.value).toContain('<html>');
      expect(content.value).toContain('<head>');
      expect(content.value).toContain('</head>');
      expect(content.value).toContain('<body>');
      expect(content.value).toContain('</body>');
      expect(content.value).toContain('</html>');
    });

    it('requests the document with the correct content type', () => {
      service.generate('body', '', 'my-document.pdf').subscribe();

      const req = httpMock.expectOne({
        method: 'POST',
        url: 'https://pdf-exporter-api.interfolio.com/pdf',
      });

      req.flush({});
      expect(req.request.headers.get('Content-Type')).toEqual(
        'application/x-www-form-urlencoded'
      );
    });

    it('creates and clicks a link to download pdf once received', () => {
      spyOn(document, 'createElement').and.callThrough();
      spyOn(document.element, 'click').and.callThrough();

      service.generate('body', '', 'my-document.pdf').subscribe();

      const req = httpMock.expectOne({
        method: 'POST',
        url: 'https://pdf-exporter-api.interfolio.com/pdf',
      });

      req.flush({
        pdf: 'pdf-data',
      });

      expect(document.createElement).toHaveBeenCalledWith('a');
      expect(document.element.href).toEqual(
        'data:application/pdf;base64,pdf-data'
      );
      expect(document.element.download).toEqual('my-document.pdf');
      expect(document.element.click).toHaveBeenCalled();
    });
  });
});
