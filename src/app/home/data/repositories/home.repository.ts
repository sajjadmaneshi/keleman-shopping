import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { Observable } from 'rxjs';
import { HttpClientResult } from '../../../shared/data/models/http/http-client.result';
import { SliderViewModel } from '../view-models/slider.view-model';
import { ProductViewModel } from '../../../layout/pages/products/data/models/view-models/product.view-model';
import { AdsBannerViewModel } from '../view-models/ads-banner.view-model';
import { BreadCrumbViewModel } from '../view-models/bread-crumb.view-model';
import { BreadCrumbTypeEnum } from '../bread-crumb-type.enum';

@Injectable({ providedIn: 'root' })
export class HomeRepository extends DataService<any> {
  constructor(_http: HttpClient) {
    super('home', _http);
  }

  getSlidesOfSlider(): Observable<HttpClientResult<SliderViewModel[]>> {
    return this._http.get(`${this._getUrl}/sliders`) as Observable<
      HttpClientResult<SliderViewModel[]>
    >;
  }

  getAmazingOffers(): Observable<HttpClientResult<ProductViewModel[]>> {
    return this._http.get(`${this._getUrl}/amazingOffers`) as Observable<
      HttpClientResult<ProductViewModel[]>
    >;
  }
  getPackages(): Observable<HttpClientResult<ProductViewModel[]>> {
    return this._http.get(`${this._getUrl}/packages`) as Observable<
      HttpClientResult<ProductViewModel[]>
    >;
  }

  getAdsBanner(): Observable<HttpClientResult<AdsBannerViewModel[]>> {
    return this._http.get(`${this._getUrl}/ads`) as Observable<
      HttpClientResult<AdsBannerViewModel[]>
    >;
  }

  getBreadcrumb(
    type: BreadCrumbTypeEnum,
    id: number
  ): Observable<HttpClientResult<BreadCrumbViewModel[]>> {
    return this._http.get(
      `${this._getUrl}/breadcrump/${type}/${id}`
    ) as Observable<HttpClientResult<BreadCrumbViewModel[]>>;
  }
}
