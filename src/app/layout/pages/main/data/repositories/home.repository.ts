import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { Observable } from 'rxjs';
import { HttpClientResult } from '../../../../../shared/models/http/http-client.result';
import { SliderViewModel } from './view-models/slider.view-model';
import { ProductViewModel } from '../../../products/data/models/view-models/product.view-model';

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

  getAmazingOffers(
    count?: number
  ): Observable<HttpClientResult<ProductViewModel[]>> {
    return this._http.get(
      `${this._getUrl}/amazingOffers/${count ?? ''}`
    ) as Observable<HttpClientResult<ProductViewModel[]>>;
  }
}
