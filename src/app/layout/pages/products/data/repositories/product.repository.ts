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

  getProductDetails(
    url: string
  ): Observable<HttpClientResult<ProductDetailViewModel>> {
    return this._http.get(`${this._getUrl}/${url}`) as Observable<
      HttpClientResult<ProductDetailViewModel>
    >;
  }

  getProductGallary(
    url: string
  ): Observable<HttpClientResult<ProductGalleryViewModel[]>> {
    return this._http.get(`${this._getUrl}/${url}/gallery`) as Observable<
      HttpClientResult<ProductGalleryViewModel[]>
    >;
  }

  getProductComments(
    url: string
  ): Observable<HttpClientResult<ProductCommentViewModel[]>> {
    return this._http.get(`${this._getUrl}/${url}/comments`) as Observable<
      HttpClientResult<ProductCommentViewModel[]>
    >;
  }

  getProductSpecifics(
    url: string
  ): Observable<HttpClientResult<ProductSpecificViewModel[]>> {
    return this._http.get(`${this._getUrl}/${url}/specifics`) as Observable<
      HttpClientResult<ProductSpecificViewModel[]>
    >;
  }

  getProductPriceChart(
    url: string
  ): Observable<HttpClientResult<ProductPriceChartViewModel[]>> {
    return this._http.get(`${this._getUrl}/${url}/priceChart`) as Observable<
      HttpClientResult<ProductPriceChartViewModel[]>
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
