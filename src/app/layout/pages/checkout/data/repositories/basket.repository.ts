import { Injectable } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';
import { BasketItemViewModel } from '../models/basket-item.view-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import { UpdateBasketDto } from '../dto/update-basket.dto';
import { BasketCheckoutViewModel } from '../models/basket-checkout.view-model';
import { MergeBasketDto } from '../dto/merge-basket.dto';
import { PackageItemsViewModel } from '../../../products/data/models/view-models/package-items.view-model';
import { MergeResultViewModel } from '../models/merge-result.view-model';
import { InBasketCountViewModel } from '../models/in-basket-count.view-model';

@Injectable({ providedIn: 'root' })
export class BasketRepository extends DataService<BasketItemViewModel> {
  constructor(_http: HttpClient) {
    super('cart', _http);
  }

  getBasket(): Observable<HttpClientResult<BasketItemViewModel[]>> {
    return this._http.get(
      `${this._getCartUrl}?userId=${localStorage.getItem('USERID')}`
    ) as Observable<HttpClientResult<BasketItemViewModel[]>>;
  }

  mergeCart(
    dto: MergeBasketDto[]
  ): Observable<HttpClientResult<MergeResultViewModel[]>> {
    return this._http.post(
      `${this._getCartUrl}/merge?userId=${localStorage.getItem('USERID')}`,
      dto
    ) as Observable<HttpClientResult<MergeResultViewModel[]>>;
  }

  getBasketCheckout(): Observable<HttpClientResult<BasketCheckoutViewModel>> {
    return this._http.get(
      `${this._getCartUrl}/checkout?userId=${localStorage.getItem('USERID')}`
    ) as Observable<HttpClientResult<BasketCheckoutViewModel>>;
  }

  getCartCount(): Observable<HttpClientResult<number>> {
    return this._http.get(
      `${this._getCartUrl}/count?userId=${localStorage.getItem('USERID')}`
    ) as Observable<HttpClientResult<number>>;
  }

  isInCart(
    productId: number
  ): Observable<HttpClientResult<InBasketCountViewModel[]>> {
    return this._http.get(
      `${this._getCartUrl}/inCart/${productId}?userId=${localStorage.getItem(
        'USERID'
      )}`
    ) as Observable<HttpClientResult<InBasketCountViewModel[]>>;
  }

  addToCart(dto: AddToCartDto): Observable<HttpClientResult<boolean>> {
    return this._http.post(
      `${this._getCartUrl}?userId=${localStorage.getItem('USERID')}`,
      dto
    ) as Observable<HttpClientResult<boolean>>;
  }

  updateCart(dto: UpdateBasketDto): Observable<HttpClientResult<boolean>> {
    return this._http.patch(
      `${this._getCartUrl}?userId=${localStorage.getItem('USERID')}`,
      dto
    ) as Observable<HttpClientResult<boolean>>;
  }
  removeFromCart(orderId: number): Observable<HttpClientResult<boolean>> {
    return this._http.delete(
      `${this._getCartUrl}/${orderId}?userId=${localStorage.getItem('USERID')}`
    ) as Observable<HttpClientResult<boolean>>;
  }

  getReport(factorId?: number): Observable<Blob> {
    return this._http.get(
      `${this._getCartUrl}/report/${
        factorId || ''
      }?userId=${localStorage.getItem('USERID')}`,
      { responseType: 'blob' }
    ) as Observable<Blob>;
  }

  getPackageDetails(packageId: number) {
    return this._http.get(
      `${
        this._getCartUrl
      }/packageDetail/${packageId}?userId=${localStorage.getItem('USERID')}`
    ) as Observable<HttpClientResult<PackageItemsViewModel>>;
  }
}
