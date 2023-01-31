import { DOCUMENT } from '@angular/common';
import { Environment } from '@intf/environments/src/environment';
import {
  HttpBackend,
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PdfGenerator {
  private http: HttpClient;

  constructor(
    private environment: Environment,
    private httpBackend: HttpBackend,
    httpClient: HttpClient,
    @Inject(DOCUMENT) private document
  ) {
    this.http = new HttpClient(httpBackend);
  }

  generate(
    body: string,
    head?: string,
    title?: string
  ): Observable<{ pdf: string }> {
    const html = this.constructHtml(body, head ? head : '');

    const bodyParams = new HttpParams().set('html', html);

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this.http
      .post<{ pdf: string }>(this.getPdfGeneratorUrl(), bodyParams, { headers })
      .pipe(
        map(response => {
          const downloadLink = this.document.createElement('a');

          downloadLink.href = `data:application/pdf;base64,${response.pdf}`;
          downloadLink.download = title || 'document.pdf';
          downloadLink.click();

          return response;
        })
      );
  }

  private constructHtml(body: string, head: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <base href="/">
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
          ${head}
        </head>
        <body>
          ${body}
        </body>
      </html>
    `;
  }

  private getPdfGeneratorUrl(): string {
    return `${this.environment.config.PDF_EXPORTER_API}/pdf`;
  }
}
