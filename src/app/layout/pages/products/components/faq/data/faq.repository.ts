import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { HttpClientResult } from 'src/app/shared/data/models/http/http-client.result';
import { FaqViewModel } from './faq.view-model';
import { FaqDto } from './faq.dto';

@Injectable()
export class FaqRepository extends DataService<any> {
  constructor(_http: HttpClient) {
    super('productQuestion', _http);
  }

  addQuestion(dto: FaqDto): Observable<HttpClientResult<boolean>> {
    return this._http.post(`${this._getUrl}`, dto) as Observable<
      HttpClientResult<boolean>
    >;
  }

  getAllQuestions(id: number): Observable<HttpClientResult<FaqViewModel[]>> {
    return this._http.get(`${this._getUrl}/${id}`) as Observable<
      HttpClientResult<FaqViewModel[]>
    >;
  }
}
