import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../../../../../shared/services/data.service';
import { ProductCategoryViewModel } from '../../../../../shared/data/models/view-models/product-category.view-model';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';

import { ProductViewModel } from '../models/view-models/product.view-model';
import { CategorySimpleInfoViewModel } from '../models/view-models/category-simple-info.view-model';
import {
  ProductSearchResult,
  SeaechService,
} from '../../../../../shared/services/search.service';

@Injectable({ providedIn: 'root' })
export class ProductRepository extends DataService<
  HttpClientResult<CategorySimpleInfoViewModel>
> {
  constructor(
    _http: HttpClient,
    private _searchService: SeaechService<ProductViewModel>
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
  ): Observable<HttpClientResult<ProductSearchResult>> {
    const params = {
      catUrl: categoryuRL,
      offset,
      limit,
    };
    return this._searchService.search(
      this._getUrl,
      params,
      search
    ) as Observable<HttpClientResult<ProductSearchResult>>;
  }

  override getSingle(
    id: number | string
  ): Observable<HttpClientResult<CategorySimpleInfoViewModel>> {
    return this._http.get(`${this._getUrl}/categoryDetail/${id}`) as Observable<
      HttpClientResult<CategorySimpleInfoViewModel>
    >;
  }
}
