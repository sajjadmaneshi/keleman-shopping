import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { ArticleSimpleDataViewModel } from '../view-models/article-simple-data-view.model';
import {
  ArticleSearchResult,
  SearchService,
} from '../../../../../shared/services/search.service';
import { ArticleViewModel } from '../view-models/article.view-model';
import { ArticleCategoryViewModel } from '../view-models/article-category.view-model';

@Injectable({ providedIn: 'root' })
export class ArticleRepository extends DataService<any> {
  constructor(
    _http: HttpClient,
    private _searchService: SearchService<ArticleSimpleDataViewModel>
  ) {
    super('article', _http);
  }

  search(params: {
    [key: string]: any;
  }): Observable<HttpClientResult<ArticleSearchResult>> {
    return this._searchService.search(this._getUrl, params) as Observable<
      HttpClientResult<ArticleSearchResult>
    >;
  }

  getLatestArticles(
    count?: number
  ): Observable<HttpClientResult<ArticleSimpleDataViewModel[]>> {
    return this._http.get(`${this._getUrl}/last/${count}??''`) as Observable<
      HttpClientResult<ArticleSimpleDataViewModel[]>
    >;
  }

  getSingleArticle(
    url: string
  ): Observable<HttpClientResult<ArticleViewModel>> {
    return this._http.get(`${this._getUrl}/${url}`) as Observable<
      HttpClientResult<ArticleViewModel>
    >;
  }

  getArticleCategories(): Observable<
    HttpClientResult<ArticleCategoryViewModel[]>
  > {
    return this._http.get(`${this._getUrl}/categories`) as Observable<
      HttpClientResult<ArticleCategoryViewModel[]>
    >;
  }
}
