import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { IntfHttpInterceptor } from './intf-http-interceptor';

@Injectable({
  providedIn: 'root',
})
class MockService {
  constructor(private http: HttpClient) {}

  mockRequest$(): Observable<boolean> {
    return this.http.get<boolean>('http://mock.example.com');
  }
}

describe('IntfHttpInterceptor', () => {
  let httpMock: HttpTestingController;
  let testRequest: TestRequest;
  let mockService: MockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MockService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: IntfHttpInterceptor,
          multi: true,
        },
      ],
    });

    mockService = TestBed.get(MockService);
    httpMock = TestBed.get(HttpTestingController);
  });

  describe('intercept', () => {
    it('should add an Authorization header', () => {
      mockService.mockRequest$().subscribe(response => {
        expect(response).toBeTruthy();
      });
      testRequest = httpMock.expectOne('http://mock.example.com');
      expect(testRequest.request.headers.has('Cache-Control')).toEqual(true);
      expect(testRequest.request.headers.has('Content-Type')).toEqual(true);
      testRequest.flush(200);
      httpMock.verify();
    });
  });
});
