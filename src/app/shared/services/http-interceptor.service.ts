import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError, retry } from 'rxjs';
import { HttpRequestOptions } from '../models/http/http-request-options';
import { AppErrors } from '../common/app-errors';
import { BadInputError } from '../common/errors/bad-input-error';
import { NotFoundError } from '../common/errors/not-found-error';

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
    return next.handle(req).pipe(retry(3), catchError(this._handleError));
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

  private _handleError(error: Response) {
    switch (error.status) {
      case 400:
        return throwError(() => new BadInputError(error.json()));
      case 404:
        return throwError(() => new NotFoundError());
      default:
        return throwError(() => new AppErrors(error));
    }
  }
}
