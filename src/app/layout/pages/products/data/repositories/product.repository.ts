import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../../../../../shared/services/data.service';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { ProductViewModel } from '../models/view-models/product.view-model';
import { CategorySimpleInfoViewModel } from '../models/view-models/category-simple-info.view-model';
import {
  ProductSearchResult,
  SearchService,
} from '../../../../../shared/services/search.service';
import { ProductDetailViewModel } from '../models/view-models/product-detail.view-model';
import { ProductGalleryViewModel } from '../models/view-models/product-gallery.view-model';
import { ProductSpecificViewModel } from '../models/view-models/product-specific.view-model';
import { ProductPriceChartViewModel } from '../models/view-models/product-price-chart.view-model';
import { ProductDescriptionsViewModel } from '../models/view-models/product-descriptions.view-model';
import { PackageItemsViewModel } from '../models/view-models/package-items.view-model';
import { OptionPriceDto } from '../models/dto/option-price.dto';
import { OptionPriceViewModel } from '../models/view-models/option-price.view-model';

@Injectable({ providedIn: 'root' })
export class ProductRepository extends DataService<
  HttpClientResult<CategorySimpleInfoViewModel>
> {
  constructor(_http: HttpClient, private _searchService: SearchService) {
    super('product', _http);
  }

  search(params: {
    [key: string]: any;
  }): Observable<HttpClientResult<ProductSearchResult>> {
    return this._searchService.search(this._getUrl, params) as Observable<
      HttpClientResult<ProductSearchResult>
    >;
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

  getProductDescription(
    url: string
  ): Observable<HttpClientResult<ProductDescriptionsViewModel>> {
    return this._http.get(`${this._getUrl}/${url}/description`) as Observable<
      HttpClientResult<ProductDescriptionsViewModel>
    >;
  }

  getRelated(url: string): Observable<HttpClientResult<ProductViewModel[]>> {
    return this._http.get(`${this._getUrl}/${url}/related`) as Observable<
      HttpClientResult<ProductViewModel[]>
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

  getPackageDetails(
    packageId: number
  ): Observable<HttpClientResult<PackageItemsViewModel>> {
    return this._http.get(
      `${this._getUrl}/${packageId}/packageDetail`
    ) as Observable<HttpClientResult<PackageItemsViewModel>>;
  }

  favorite(productId: number): Observable<HttpClientResult<boolean>> {
    return this._http.post(
      `${this._getUrl}/${productId}/like`,
      {}
    ) as Observable<HttpClientResult<boolean>>;
  }

  isLiked(productId: number): Observable<HttpClientResult<boolean>> {
    return this._http.get(`${this._getUrl}/${productId}/isLiked`) as Observable<
      HttpClientResult<boolean>
    >;
  }

  optionPrice(
    dto: OptionPriceDto[]
  ): Observable<HttpClientResult<OptionPriceViewModel[]>> {
    return this._http.post(`${this._getUrl}/optionPrice`, dto) as Observable<
      HttpClientResult<OptionPriceViewModel[]>
    >;
  }
}
