import { Injectable } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';
import { BasketItemViewModel } from '../models/basket-item.view-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import { UpdateBasketDto } from '../dto/update-basket.dto';

@Injectable()
export class BasketRepository extends DataService<BasketItemViewModel> {
  constructor(_http: HttpClient) {
    super('cart', _http);
  }

  getBasket(): Observable<HttpClientResult<any>> {
    return this._http.get(
      `${this._getCartUrl}?userId=${localStorage.getItem('USERID')}`
    ) as Observable<HttpClientResult<any>>;
  }

  getCartCount(): Observable<HttpClientResult<number>> {
    return this._http.get(
      `${this._getCartUrl}/count?userId=${localStorage.getItem('USERID')}`
    ) as Observable<HttpClientResult<number>>;
  }

  addToCart(dto: AddToCartDto): Observable<HttpClientResult<number>> {
    return this._http.post(
      `${this._getCartUrl}?userId=${localStorage.getItem('USERID')}`,
      dto
    ) as Observable<HttpClientResult<number>>;
  }

  updateCart(dto: UpdateBasketDto): Observable<HttpClientResult<number>> {
    return this._http.patch(
      `${this._getCartUrl}?userId=${localStorage.getItem('USERID')}`,
      dto
    ) as Observable<HttpClientResult<number>>;
  }
  removeFromCart(productId: number): Observable<HttpClientResult<void>> {
    return this._http.delete(
      `${this._getCartUrl}/${productId}?userId=${localStorage.getItem(
        'USERID'
      )}`
    ) as Observable<HttpClientResult<void>>;
  }
}
