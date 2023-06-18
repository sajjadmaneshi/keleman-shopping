import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
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
import { SnackBarService } from '../components/snack-bar/snack-bar.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(public _snackBar: SnackBarService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: this._setHeaders(req as HttpRequestOptions),
    });
    return next.handle(authReq).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        return this._handleError(error);
      })
    );
  }

  private _setHeaders(req: HttpRequestOptions) {
    const token = localStorage.getItem('KELEMAN_TOKEN');

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Accept', 'application/json');
    if (!req.isBodyFormData) {
      httpHeaders = httpHeaders.append(
        'Content-Type',
        'application/json; charset=utf-8'
      );
    }
    if (token) {
      httpHeaders = httpHeaders.append('Authorization', `Bearer ${token}`);
    }

    return httpHeaders;
  }

  private _handleError(error: HttpErrorResponse) {
    if (typeof error.error.responseException === 'object') {
      this._snackBar.showDangerSnackBar(
        error.error.responseException.exceptionMessage
      );
    } else {
      this._snackBar.showDangerSnackBar(error.error.responseException);
    }

    switch (error.status) {
      case 400:
        return throwError(() => new BadInputError(error));
      case 404:
        this._snackBar.showDangerSnackBar('آدرسی با این مشخصات یافت نشد');
        return throwError(() => new NotFoundError());
      default:
        this._snackBar.showDangerSnackBar('خطای سرور');
        return throwError(() => new AppErrors(error.message));
    }
  }
}
