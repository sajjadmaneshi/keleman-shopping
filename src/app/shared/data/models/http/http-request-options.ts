import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpRequestOptions {
  isBodyFormData?: boolean;
  headers?: HttpHeaders;

  observe?: any;
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}
