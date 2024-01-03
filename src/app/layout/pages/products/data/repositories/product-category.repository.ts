import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../../../../../shared/services/data.service';
import { ProductCategoryViewModel } from '../../../../../shared/data/models/view-models/product-category.view-model';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { CategorySimpleInfoViewModel } from '../models/view-models/category-simple-info.view-model';
import { CategoryPropertyOptionViewModel } from '../models/view-models/category-property-option.view-model';

@Injectable({ providedIn: 'root' })
export class ProductCategoryRepository extends DataService<
  HttpClientResult<CategorySimpleInfoViewModel>
> {
  constructor(_http: HttpClient) {
    super('productCategory', _http);
  }

  getAllWithChildrens(
    parentId?: number
  ): Observable<HttpClientResult<ProductCategoryViewModel[]>> {
    const route = `${this._getUrl}${
      parentId != null ? `?parentId=${parentId}` : ''
    }`;

    return this._http.get(route) as Observable<
      HttpClientResult<ProductCategoryViewModel[]>
    >;
  }

  getCategoryOptions(
    categoryId: number
  ): Observable<HttpClientResult<CategoryPropertyOptionViewModel[]>> {
    return this._http.get(
      `${this._getUrl}/${categoryId}/propertyOptions`
    ) as Observable<HttpClientResult<CategoryPropertyOptionViewModel[]>>;
  }

  override getSingle(
    id: number | string
  ): Observable<HttpClientResult<CategorySimpleInfoViewModel>> {
    return this._http.get(`${this._getUrl}/detail/${id}`) as Observable<
      HttpClientResult<CategorySimpleInfoViewModel>
    >;
  }
}
