import { ENVIRONMENT } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class DataService<T> {
  constructor(private _url: string, protected _http: HttpClient) {}

  protected get _getUrl() {
    return `${ENVIRONMENT.baseUrl}${this._url}`;
  }
  protected get _getProfileUrl() {
    return `${ENVIRONMENT.baseProfileUrl}${this._url}`;
  }
  protected get _getCartUrl() {
    return `${ENVIRONMENT.baseCartUrl}${this._url}`;
  }

  getAll(params?: ParamMap[]): Observable<T[]> {
    let paramStringify = '';
    if (params) {
      const mappedArray = params.map((x) => {
        return `${x.param}=${x.value}`;
      });
      paramStringify = `?${mappedArray.join('&')}`;
    }
    return this._http
      .get(`${this._getUrl}${paramStringify}`)
      .pipe() as Observable<T[]>;
  }
  getSingle(id: number | string): Observable<T> {
    return this._http.get(`${this._getUrl}/${id}`) as Observable<T>;
  }

  create(resource: T): Observable<any> {
    return this._http.post(
      this._getUrl,
      JSON.stringify(resource)
    ) as Observable<any>;
  }
  update(resource: T): Observable<any> {
    return this._http.patch(
      this._getUrl,
      JSON.stringify(resource)
    ) as Observable<any>;
  }
  delete(id: string | number): Observable<any> {
    return this._http.delete(`${this._getUrl}/${id}`) as Observable<any>;
  }
}
export interface ParamMap {
  param: string;
  value: string;
}
