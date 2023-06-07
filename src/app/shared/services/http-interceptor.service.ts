import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {
  Observable,
  catchError,
  throwError,
  retry,
  from,
  switchMap,
} from 'rxjs';
import { HttpRequestOptions } from '../models/http/http-request-options';
import { AppErrors } from '../common/app-errors';
import { BadInputError } from '../common/errors/bad-input-error';
import { NotFoundError } from '../common/errors/not-found-error';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this._setHeaders(req as HttpRequestOptions)).pipe(
      switchMap(() => {
        const modifiedReq = req.clone();
        return next
          .handle(modifiedReq)
          .pipe(retry(3), catchError(this._handleError));
      })
    );
  }

  private _setHeaders(
    httpRequestOptions: HttpRequestOptions
  ): Promise<HttpHeaders> {
    return new Promise((resolve) => {
      let headers: HttpHeaders;
      const token = localStorage.getItem('KELEMAN_TOKEN');
      if (httpRequestOptions.headers) {
        headers = httpRequestOptions.headers as HttpHeaders;
        resolve(headers);
      } else {
        let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.set('Accept', 'application/json');
        if (!httpRequestOptions.isBodyFormData) {
          httpHeaders = httpHeaders.append(
            'Content-Type',
            'application/json; charset=utf-8'
          );
        }
        if (token) {
          httpHeaders = httpHeaders.append('Authorization', `Bearer ${token}`);
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
