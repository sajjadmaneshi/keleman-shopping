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

  getSingle(id: number | string): Observable<T> {
    return this._http.get(`${this._getUrl}/${id}`) as Observable<T>;
  }
}
