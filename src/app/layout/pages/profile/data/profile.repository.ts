import { Injectable } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientResult } from 'src/app/shared/data/models/http/http-client.result';
import { ProfileViewModel } from './view-models/profile.view-model';
import { ProfileDto } from './dto/profile.dto';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { HttpRequestOptions } from '../../../../shared/data/models/http/http-request-options';
import { FavoriteProductViewModel } from './view-models/favorite-product.view-model';
import { OrderViewModel } from './view-models/order-view.model';
import { OrderCountViewModel } from './view-models/order-count.view-model';
import { OrdersStatusEnum } from './enums/orders-status.enum';
import { UserCreditViewModel } from './view-models/user-credit.view-model';
import { PaginationViewModel } from '../../../../shared/data/models/pagination.view-model';
import { WalletTransactionViewModel } from './view-models/wallet-transaction.view-model';
import { WalletTransactionStatusEnum } from './enums/wallet-transaction-status.enum';
import { CreditTransactionViewModel } from './view-models/credit-transaction.view-model';
import { UserAddressViewModel } from './view-models/user-address.view-model';
import { AddressDto } from './dto/address.dto';

@Injectable({ providedIn: 'root' })
export class ProfileRepository extends DataService<any> {
  constructor(_http: HttpClient) {
    super('profile', _http);
  }

  uploadAvatar(fileData: FormData): Observable<HttpClientResult<string>> {
    return this._http.post(
      `${this._getProfileUrl}/uploadAvatar?userId=${localStorage.getItem(
        'USERID'
      )}`,
      fileData,
      { isBodyFormData: false } as HttpRequestOptions
    ) as Observable<HttpClientResult<string>>;
  }

  getProfile(): Observable<HttpClientResult<ProfileViewModel>> {
    return this._http.get(
      `${this._getProfileUrl}?userId=${localStorage.getItem('USERID')}`
    ) as Observable<HttpClientResult<ProfileViewModel>>;
  }

  completeProfile(dto: ProfileDto): Observable<HttpClientResult<void>> {
    return this._http.patch(
      `${this._getProfileUrl}?userId=${localStorage.getItem('USERID')}`,
      dto
    ) as Observable<HttpClientResult<void>>;
  }

  getOrdersCount(): Observable<HttpClientResult<OrderCountViewModel>> {
    return this._http.get(
      `${this._getProfileUrl}/ordersCount?userId=${localStorage.getItem(
        'USERID'
      )}`
    ) as Observable<HttpClientResult<OrderCountViewModel>>;
  }

  getUserAccount(): Observable<HttpClientResult<UserCreditViewModel>> {
    return this._http.get(
      `${this._getProfileUrl}/userAccount?userId=${localStorage.getItem(
        'USERID'
      )}`
    ) as Observable<HttpClientResult<UserCreditViewModel>>;
  }
  getOrders(
    page: number,
    limit: number,
    status?: OrdersStatusEnum
  ): Observable<HttpClientResult<PaginationViewModel<OrderViewModel>>> {
    return this._http.get(
      `${this._getProfileUrl}/orders?userId=${localStorage.getItem(
        'USERID'
      )}&&offset=${page}&&limit=${limit}${
        status != undefined ? '&&status=' + status : ''
      }`
    ) as Observable<HttpClientResult<PaginationViewModel<OrderViewModel>>>;
  }

  getFavorites(): Observable<HttpClientResult<FavoriteProductViewModel[]>> {
    return this._http.get(
      `${this._getProfileUrl}/favorites?userId=${localStorage.getItem(
        'USERID'
      )}`
    ) as Observable<HttpClientResult<FavoriteProductViewModel[]>>;
  }

  getWalletTransactions(
    page: number,
    limit: number,
    status?: WalletTransactionStatusEnum
  ): Observable<
    HttpClientResult<PaginationViewModel<WalletTransactionViewModel>>
  > {
    return this._http.get(
      `${this._getProfileUrl}/walletTransactions?userId=${localStorage.getItem(
        'USERID'
      )}&&offset=${page}&&limit=${limit}${
        status != undefined ? '&&status=' + status : ''
      }`
    ) as Observable<
      HttpClientResult<PaginationViewModel<WalletTransactionViewModel>>
    >;
  }

  getCreditTransactions(
    page: number,
    limit: number,
    isPaid?: boolean
  ): Observable<
    HttpClientResult<PaginationViewModel<CreditTransactionViewModel>>
  > {
    return this._http.get(
      `${this._getProfileUrl}/creditTransactions?userId=${localStorage.getItem(
        'USERID'
      )}&&offset=${page}&&limit=${limit}${
        isPaid != undefined ? '&&isPaid=' + isPaid : ''
      }`
    ) as Observable<
      HttpClientResult<PaginationViewModel<CreditTransactionViewModel>>
    >;
  }

  getUserAddresses(): Observable<HttpClientResult<UserAddressViewModel[]>> {
    return this._http.get(
      `${this._getProfileUrl}/address?userId=${localStorage.getItem('USERID')}`
    ) as Observable<HttpClientResult<UserAddressViewModel[]>>;
  }
  getUserAddress(
    id: number
  ): Observable<HttpClientResult<UserAddressViewModel>> {
    return this._http.get(
      `${this._getProfileUrl}/address/${id}?userId=${localStorage.getItem(
        'USERID'
      )}`
    ) as Observable<HttpClientResult<UserAddressViewModel>>;
  }
  addNewAddress(dto: AddressDto): Observable<HttpClientResult<string>> {
    return this._http.post(
      `${this._getProfileUrl}/address?userId=${localStorage.getItem('USERID')}`,
      dto
    ) as Observable<HttpClientResult<string>>;
  }

  updateAddress(
    id: number,
    dto: AddressDto
  ): Observable<HttpClientResult<string>> {
    return this._http.patch(
      `${this._getProfileUrl}/address/${id}/?userId=${localStorage.getItem(
        'USERID'
      )}`,
      dto
    ) as Observable<HttpClientResult<string>>;
  }

  deleteAddress(id: number): Observable<HttpClientResult<void>> {
    return this._http.delete(
      `${this._getProfileUrl}/address/${id}?userId=${localStorage.getItem(
        'USERID'
      )}`
    ) as Observable<HttpClientResult<void>>;
  }

  addDefaultAddress(id: number): Observable<HttpClientResult<void>> {
    return this._http.put(
      `${
        this._getProfileUrl
      }/address/${id}/addToDefault?userId=${localStorage.getItem('USERID')}`,
      {}
    ) as Observable<HttpClientResult<void>>;
  }
}
