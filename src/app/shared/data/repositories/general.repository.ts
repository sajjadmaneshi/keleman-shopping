import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { HttpClientResult } from '../models/http/http-client.result';
import { StatesViewModel } from '../models/view-models/states.view-model';
import { CityViewModel } from '../models/view-models/city.view-model';
import { SearchViewModel } from '../models/search.view-model';

@Injectable({ providedIn: 'root' })
export class GeneralRepository extends DataService<any> {
  constructor(_http: HttpClient) {
    super('general', _http);
  }

  search(query: string): Observable<HttpClientResult<SearchViewModel>> {
    return this._http.get(`${this._getUrl}${query}`) as Observable<
      HttpClientResult<SearchViewModel>
    >;
  }

  getAllStates(): Observable<HttpClientResult<StatesViewModel[]>> {
    return this._http.get(`${this._getUrl}/states`) as Observable<
      HttpClientResult<StatesViewModel[]>
    >;
  }

  getCitiesOfState(
    stateId: number
  ): Observable<HttpClientResult<CityViewModel[]>> {
    return this._http.get(`${this._getUrl}/cities/${stateId}`) as Observable<
      HttpClientResult<CityViewModel[]>
    >;
  }
}
