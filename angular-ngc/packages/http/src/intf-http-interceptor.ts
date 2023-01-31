import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class IntfHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newHeaders = req.headers;

    if (!req.headers.has('Content-Type')) {
      newHeaders = newHeaders.append('Content-Type', 'application/json');
    }

    newHeaders = newHeaders.set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Expires', '-1')
      .set('Pragma', 'no-cache');

    const modifiedRequest = req.clone({ withCredentials: true, headers: newHeaders });

    return next.handle(modifiedRequest);
  }
}
