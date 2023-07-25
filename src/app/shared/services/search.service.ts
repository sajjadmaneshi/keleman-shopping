import { ProductViewModel } from 'src/app/layout/pages/products/data/models/view-models/product.view-model';
import { ArticleViewModel } from '../../layout/pages/magazine/data/view-models/article.view-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientResult } from '../data/models/http/http-client.result';
import { HttpClient } from '@angular/common/http';
import { QueryParamGeneratorService } from './query-params-generator.service';

export interface ProductSearchResult {
  products: ProductViewModel[];
  totalElements: number;
  category: { id: number; title: string };
}

export interface ArticleSearchResult {
  articles: ArticleViewModel[];
  totalElements: number;
  category: { id: number; title: string };
}
@Injectable({ providedIn: 'root' })
export class SeaechService<T> {
  constructor(
    private _http: HttpClient,
    private _queryParamService: QueryParamGeneratorService
  ) {}

  search(
    url: string,
    params: {
      catUrl?: string;
      offset?: number;
      limit?: number;
    },
    search?: string
  ): Observable<HttpClientResult<ProductSearchResult | ArticleSearchResult>> {
    const queryParams = this._queryParamService
      .generateObjectToQueryParam(params)
      .generateSearchQueryParam(search)
      .getQueryParams();
    return this._http.get(
      `${url}${queryParams ? `?${queryParams}` : ''}`
    ) as Observable<
      HttpClientResult<ProductSearchResult | ArticleSearchResult>
    >;
  }
}
