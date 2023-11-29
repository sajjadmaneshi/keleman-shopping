import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError, retry } from 'rxjs';
import { HttpRequestOptions } from '../data/models/http/http-request-options';
import { AppErrors } from '../common/app-errors';
import { BadInputError } from '../common/errors/bad-input-error';
import { NotFoundError } from '../common/errors/not-found-error';
import { SnackBarService } from '../components/snack-bar/snack-bar.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private _snackBarService: SnackBarService,
    @Inject(PLATFORM_ID) private _platFormId: any
  ) {}

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
    let token: string | undefined | null = undefined;
    if (isPlatformBrowser(this._platFormId)) {
      token = localStorage.getItem('KELEMAN_TOKEN');
    }

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Accept', 'application/json');
    if (req.isBodyFormData === false) {
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
    this._snackBarService.showDangerSnackBar(
      error.error.responseException?.exceptionMessage
    );

    switch (error.status) {
      case 400:
        return throwError(() => new BadInputError(error));
      case 404:
        this._snackBarService.showDangerSnackBar(
          'آدرسی با این مشخصات یافت نشد'
        );
        return throwError(() => new NotFoundError());
      default:
        this._snackBarService.showDangerSnackBar(
          error.error.responseException?.exceptionMessage
        );
        return throwError(() => new AppErrors(error.message));
    }
  }
}
