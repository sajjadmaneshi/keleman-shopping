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
import { ProductDetailViewModel } from '../models/view-models/product-detail.view-model';
import { ProductGalleryViewModel } from '../models/view-models/product-gallery.view-model';
import { ProductCommentViewModel } from '../models/view-models/product-comment.view-model';
import { ProductSpecificViewModel } from '../models/view-models/product-specific.view-model';
import { ProductPriceChartViewModel } from '../models/view-models/product-price-chart.view-model';
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
