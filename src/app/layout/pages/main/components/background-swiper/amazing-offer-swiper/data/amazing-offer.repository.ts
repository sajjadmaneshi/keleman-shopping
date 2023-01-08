import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductViewModel } from './models/product.view-model';
import { ENVIRONMENT } from '../../../../../../../../environments/environment';

@Injectable()
export class AmazingOfferRepository {
  constructor(private _http: HttpClient) {}

  getAll(): Observable<ProductViewModel[]> {
    return this._http.get(`${ENVIRONMENT.baseUrl}products`) as Observable<
      ProductViewModel[]
    >;
  }
}
