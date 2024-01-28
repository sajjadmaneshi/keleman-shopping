import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { HttpClientResult } from '../models/http/http-client.result';
import { MegaMenuViewModel } from '../models/view-models/mega-menu.view-model';

@Injectable({ providedIn: 'root' })
export class MegaMenuRepository extends DataService<any> {
  constructor(_http: HttpClient) {
    super('megaMenu', _http);
  }

  getAll(
    parentId: number | null
  ): Observable<HttpClientResult<MegaMenuViewModel[]>> {
    return this._http.get(
      `${this._getUrl}${parentId != null ? `?parentId=${parentId}` : ''}`
    ) as Observable<HttpClientResult<MegaMenuViewModel[]>>;
  }
}
