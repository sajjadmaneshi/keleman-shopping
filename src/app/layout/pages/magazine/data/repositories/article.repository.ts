import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { ArticleViewModel } from '../view-models/article.view-model';
import {
  ArticleSearchResult,
  SeaechService,
} from '../../../../../shared/services/search.service';

@Injectable({ providedIn: 'root' })
export class ArticleRepository extends DataService<any> {
  constructor(
    _http: HttpClient,
    private _searchService: SeaechService<ArticleViewModel>
  ) {
    super('article', _http);
  }

  search(
    categoryuRL?: string,
    offset?: number,
    limit?: number,
    search?: string
  ): Observable<HttpClientResult<ArticleSearchResult>> {
    const params = {
      catUrl: categoryuRL,
      offset,
      limit,
    };
    return this._searchService.search(
      this._getUrl,
      params,
      search
    ) as Observable<HttpClientResult<ArticleSearchResult>>;
  }

  getLatestArticles(
    count?: number
  ): Observable<HttpClientResult<ArticleViewModel[]>> {
    return this._http.get(`${this._getUrl}/last/${count}??''`) as Observable<
      HttpClientResult<ArticleViewModel[]>
    >;
  }
}
