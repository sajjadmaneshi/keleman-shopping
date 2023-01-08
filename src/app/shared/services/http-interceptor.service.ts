import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { HttpRequestOptions } from '../models/http/http-request-options';
import { AppErrors } from '../common/app-errors';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(@Inject('accessToken') private accessToken?: string) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._setHeaders(req as HttpRequestOptions).then((result) => {
      req = req.clone({
        headers: result,
      });
    });
    return next.handle(req).pipe(
      catchError((error: Response) => {
        throw new AppErrors(error);
      })
    );
  }

  private _setHeaders(
    httpRequestOptions: HttpRequestOptions
  ): Promise<HttpHeaders> {
    return new Promise((resolve) => {
      let headers: HttpHeaders;

      if (httpRequestOptions.headers) {
        headers = httpRequestOptions.headers as HttpHeaders;
        resolve(headers);
      } else {
        let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.set('Accept', 'application/json');
        if (!httpRequestOptions.isBodyFormData) {
          httpHeaders = httpHeaders = httpHeaders.append(
            'Content-Type',
            'application/json; charset=utf-8'
          );
        }
        if (this.accessToken) {
          httpHeaders = httpHeaders.append(
            'Authorization',
            `Bearer ${this.accessToken}`
          );
        }

        resolve(httpHeaders);
      }
    });
  }
}
