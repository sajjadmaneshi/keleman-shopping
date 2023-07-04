import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../../../../../shared/services/data.service';
import { ProductCategoryViewModel } from '../../../../../shared/data/models/view-models/product-category.view-model';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { QueryParamGeneratorService } from '../../../../../shared/services/query-params-generator.service';

import { ProductViewModel } from '../models/view-models/product.view-model';
import { CategorySimpleInfoViewModel } from '../models/view-models/category-simple-info.view-model';

@Injectable({ providedIn: 'root' })
export class ProductRepository extends DataService<
  HttpClientResult<CategorySimpleInfoViewModel>
> {
  constructor(
    _http: HttpClient,
    private _queryParamService: QueryParamGeneratorService
  ) {
    super('product', _http);
  }

  getAllProductCategoriesWithChildrens(
    parentId?: number
  ): Observable<HttpClientResult<ProductCategoryViewModel[]>> {
    const route = `${this._getUrl}/categories${
      parentId != null ? `?parentId=${parentId}` : ''
    }`;

    return this._http.get(route) as Observable<
      HttpClientResult<ProductCategoryViewModel[]>
    >;
  }

  search(
    categoryuRL?: string,
    offset?: number,
    limit?: number,
    search?: string
  ): Observable<
    HttpClientResult<{
      products: ProductViewModel[];
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
        products: ProductViewModel[];
        totalElements: number;
        category: { id: number; title: string };
      }>
    >;
  }

  override getSingle(
    id: number | string
  ): Observable<HttpClientResult<CategorySimpleInfoViewModel>> {
    return this._http.get(`${this._getUrl}/categoryDetail/${id}`) as Observable<
      HttpClientResult<CategorySimpleInfoViewModel>
    >;
  }
}
