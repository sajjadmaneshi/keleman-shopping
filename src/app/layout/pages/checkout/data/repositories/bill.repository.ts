import { Injectable } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { ShippingCostViewModel } from '../models/shipping-cost-view.model';
import { SetDiscountDto } from '../dto/set-discount.dto';
import { SaveOrderDto } from './save-order.dto';
import { BasketCheckoutViewModel } from '../models/basket-checkout.view-model';

@Injectable()
export class BillRepository extends DataService<ShippingCostViewModel> {
  constructor(_http: HttpClient) {
    super('bill', _http);
  }

  getShippingCost(
    addressId: number
  ): Observable<HttpClientResult<ShippingCostViewModel>> {
    return this._http.get(
      `${
        this._getCartUrl
      }/shippingCost/${addressId}?userId=${localStorage.getItem('USERID')}`
    ) as Observable<HttpClientResult<ShippingCostViewModel>>;
  }

  setDiscount(
    dto: SetDiscountDto
  ): Observable<HttpClientResult<BasketCheckoutViewModel>> {
    return this._http.post(
      `${this._getCartUrl}/setDiscount?userId=${localStorage.getItem(
        'USERID'
      )}`,
      dto
    ) as Observable<HttpClientResult<BasketCheckoutViewModel>>;
  }

  save(dto: SaveOrderDto): Observable<HttpClientResult<number>> {
    return this._http.post(
      `${this._getCartUrl}/save?userId=${localStorage.getItem('USERID')}`,
      dto
    ) as Observable<HttpClientResult<number>>;
  }
}
