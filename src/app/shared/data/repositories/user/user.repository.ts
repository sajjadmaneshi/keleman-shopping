import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { HttpClientResult } from '../../models/http/http-client.result';
import { UserSimpleInfoViewModel } from '../../models/view-models/user-simple-info.view-model';

@Injectable({ providedIn: 'root' })
export class UserRepository extends DataService<any> {
  constructor(_http: HttpClient) {
    super('user', _http);
  }

  getSimpleInfo(): Observable<HttpClientResult<UserSimpleInfoViewModel>> {
    return this._http.get(`${this._getUrl}/simpleInfo`) as Observable<
      HttpClientResult<UserSimpleInfoViewModel>
    >;
  }
}
