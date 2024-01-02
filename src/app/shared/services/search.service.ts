import { ProductViewModel } from 'src/app/layout/pages/products/data/models/view-models/product.view-model';
import { ArticleSimpleDataViewModel } from '../../layout/pages/magazine/data/view-models/article-simple-data-view.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientResult } from '../data/models/http/http-client.result';
import { HttpClient } from '@angular/common/http';
import { QueryParamGeneratorService } from './query-params-generator.service';

export interface ProductSearchResult {
  products: ProductViewModel[];
  totalElements: number;
  maxPrice: number;
  category: CategoryMinifyViewModel;
}

export interface CategoryMinifyViewModel {
  id: number;
  name: string;
  seoTitle: string;
  seoDescription: string;
}

export interface ArticleSearchResult {
  articles: ArticleSimpleDataViewModel[];
  totalElements: number;
  category?: CategoryMinifyViewModel;
}
@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(
    private _http: HttpClient,
    private _queryParamService: QueryParamGeneratorService
  ) {}

  search(
    url: string,
    params?: { [key: string]: any }
  ): Observable<HttpClientResult<ProductSearchResult | ArticleSearchResult>> {
    const queryParams = this._queryParamService
      .generateObjectToQueryParam(params!)
      .getQueryParams();
    this._queryParamService.resetQueryParams();
    return this._http.get(
      `${url}${queryParams ? `?${queryParams}` : ''}`
    ) as Observable<
      HttpClientResult<ProductSearchResult | ArticleSearchResult>
    >;
  }
}
