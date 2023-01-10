import { ENVIRONMENT } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class DataService<T> {
  constructor(private _url: string, private _http: HttpClient) {}

  private get _getUrl() {
    return `${ENVIRONMENT.baseUrl}${this._url}`;
  }

  getAll(): Observable<T[]> {
    return this._http.get(this._getUrl).pipe() as Observable<T[]>;
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
