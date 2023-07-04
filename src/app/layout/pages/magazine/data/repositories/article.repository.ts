import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { ArticleViewModel } from '../view-models/article.view-model';
import { QueryParamGeneratorService } from '../../../../../shared/services/query-params-generator.service';

@Injectable({ providedIn: 'root' })
export class ArticleRepository extends DataService<any> {
  constructor(
    _http: HttpClient,
    private _queryParamService: QueryParamGeneratorService
  ) {
    super('article', _http);
  }

  search(
    categoryuRL?: string,
    offset?: number,
    limit?: number,
    search?: string
  ): Observable<
    HttpClientResult<{
      articles: ArticleViewModel[];
      totalElements: number;
      category: { id: number; title: string };
    }>
  > {
    const params = {
      catUrl: categoryuRL,
      offset,
      limit,
      q: search,
    };
    const httpParams = this._queryParamService.generateParams(params);
    return this._http.get(`${this._getUrl}`, {
      params: httpParams,
    }) as Observable<
      HttpClientResult<{
        articles: ArticleViewModel[];
        totalElements: number;
        category: { id: number; title: string };
      }>
    >;
  }

  getLatestArticles(
    count?: number
  ): Observable<HttpClientResult<ArticleViewModel[]>> {
    return this._http.get(`${this._getUrl}/last/${count}??''`) as Observable<
      HttpClientResult<ArticleViewModel[]>
    >;
  }
}
