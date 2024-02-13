import { Injectable } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientResult } from 'src/app/shared/data/models/http/http-client.result';
import { ProfileViewModel } from './view-models/profile.view-model';
import { ProfileDto } from './dto/profile.dto';
import { HttpRequestOptions } from '../../../../shared/data/models/http/http-request-options';
import { FavoriteProductViewModel } from './view-models/favorite-product.view-model';
import { OrderViewModel } from './view-models/order.view-model';
import { OrderCountViewModel } from './view-models/order-count.view-model';
import { OrdersStatusEnum } from './enums/orders-status.enum';
import { UserCreditViewModel } from './view-models/user-credit.view-model';
import { PaginationViewModel } from '../../../../shared/data/models/pagination.view-model';
import { WalletTransactionViewModel } from './view-models/wallet-transaction.view-model';
import { WalletTransactionStatusEnum } from './enums/wallet-transaction-status.enum';
import { CreditTransactionViewModel } from './view-models/credit-transaction.view-model';
import { UserAddressViewModel } from './view-models/user-address.view-model';
import { AddressDto } from './dto/address.dto';
import { WithdrawRequestDto } from './dto/withdraw-request.dto';
import { WithdrawRequestViewModel } from './view-models/withdraw-request.view-model';
import { UserCommentViewModel } from './view-models/user-comment.view-model';
import { UserQuestionViewModel } from './view-models/user-question.view-model';
import { ReturnReasonViewModel } from './view-models/return-reason.view-model';
import { ReturnRequestViewModel } from './view-models/return-request.view-model';
import { ReturnRequestStatusEnum } from './enums/return-request-status.enum';
import { OrderCanReturnViewModel } from './view-models/order-can-return.view-model';
import { ReturnRequestDto } from './dto/return-request.dto';

@Injectable({ providedIn: 'root' })
export class ProfileRepository extends DataService<any> {
  constructor(_http: HttpClient) {
    super('profile', _http);
  }

  uploadAvatar(fileData: FormData): Observable<HttpClientResult<string>> {
    return this._http.post(`${this._getProfileUrl}/uploadAvatar`, fileData, {
      isBodyFormData: false,
    } as HttpRequestOptions) as Observable<HttpClientResult<string>>;
  }

  getProfile(): Observable<HttpClientResult<ProfileViewModel>> {
    return this._http.get(`${this._getProfileUrl}`) as Observable<
      HttpClientResult<ProfileViewModel>
    >;
  }

  completeProfile(dto: ProfileDto): Observable<HttpClientResult<void>> {
    return this._http.patch(`${this._getProfileUrl}`, dto) as Observable<
      HttpClientResult<void>
    >;
  }

  getOrdersCount(): Observable<HttpClientResult<OrderCountViewModel>> {
    return this._http.get(`${this._getProfileUrl}/ordersCount`) as Observable<
      HttpClientResult<OrderCountViewModel>
    >;
  }

  getUserAccount(): Observable<HttpClientResult<UserCreditViewModel>> {
    return this._http.get(`${this._getProfileUrl}/userAccount`) as Observable<
      HttpClientResult<UserCreditViewModel>
    >;
  }
  getOrders(
    page: number,
    limit: number,
    isPaid?: boolean,
    status?: OrdersStatusEnum
  ): Observable<HttpClientResult<PaginationViewModel<OrderViewModel>>> {
    return this._http.get(
      `${this._getProfileUrl}/orders?offset=${page}&&limit=${limit}${
        status != undefined ? '&&status=' + status : ''
      }${isPaid != undefined ? '&&isPaid=' + isPaid : ''}`
    ) as Observable<HttpClientResult<PaginationViewModel<OrderViewModel>>>;
  }

  getOrderFactor(orderId: number): Observable<Blob> {
    return this._http.get(
      `${this._getProfileUrl}/orderFactor/${orderId}?format=pdf`,
      { responseType: 'blob' }
    ) as Observable<Blob>;
  }

  getFavorites(): Observable<HttpClientResult<FavoriteProductViewModel[]>> {
    return this._http.get(`${this._getProfileUrl}/favorites`) as Observable<
      HttpClientResult<FavoriteProductViewModel[]>
    >;
  }

  getComments(
    page: number,
    limit: number,
    allowToShow?: boolean
  ): Observable<HttpClientResult<PaginationViewModel<UserCommentViewModel>>> {
    return this._http.get(
      `${this._getProfileUrl}/comments?offset=${page}&&limit=${limit}${
        allowToShow != undefined ? '&&allowToShow=' + allowToShow : ''
      }`
    ) as Observable<
      HttpClientResult<PaginationViewModel<UserCommentViewModel>>
    >;
  }

  getQuestions(
    page: number,
    limit: number
  ): Observable<HttpClientResult<PaginationViewModel<UserQuestionViewModel>>> {
    return this._http.get(
      `${this._getProfileUrl}/questions?offset=${page}&&limit=${limit}`
    ) as Observable<
      HttpClientResult<PaginationViewModel<UserQuestionViewModel>>
    >;
  }

  getWalletTransactions(
    page: number,
    limit: number,
    status?: WalletTransactionStatusEnum
  ): Observable<
    HttpClientResult<PaginationViewModel<WalletTransactionViewModel>>
  > {
    return this._http.get(
      `${
        this._getProfileUrl
      }/walletTransactions?offset=${page}&&limit=${limit}${
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
      `${
        this._getProfileUrl
      }/creditTransactions?offset=${page}&&limit=${limit}${
        isPaid != undefined ? '&&isPaid=' + isPaid : ''
      }`
    ) as Observable<
      HttpClientResult<PaginationViewModel<CreditTransactionViewModel>>
    >;
  }

  /*================= userAddress ================================*/

  getUserAddresses(): Observable<HttpClientResult<UserAddressViewModel[]>> {
    return this._http.get(`${this._getProfileUrl}/address`) as Observable<
      HttpClientResult<UserAddressViewModel[]>
    >;
  }
  getUserAddress(
    id: number
  ): Observable<HttpClientResult<UserAddressViewModel>> {
    return this._http.get(`${this._getProfileUrl}/address/${id}`) as Observable<
      HttpClientResult<UserAddressViewModel>
    >;
  }

  getDefaultAddress(): Observable<HttpClientResult<UserAddressViewModel>> {
    return this._http.get(
      `${this._getProfileUrl}/address/default`
    ) as Observable<HttpClientResult<UserAddressViewModel>>;
  }
  addNewAddress(dto: AddressDto): Observable<HttpClientResult<string>> {
    return this._http.post(`${this._getProfileUrl}/address`, dto) as Observable<
      HttpClientResult<string>
    >;
  }

  updateAddress(
    id: number,
    dto: AddressDto
  ): Observable<HttpClientResult<string>> {
    return this._http.patch(
      `${this._getProfileUrl}/address/${id}`,
      dto
    ) as Observable<HttpClientResult<string>>;
  }

  deleteAddress(id: number): Observable<HttpClientResult<void>> {
    return this._http.delete(
      `${this._getProfileUrl}/address/${id}`
    ) as Observable<HttpClientResult<void>>;
  }

  addDefaultAddress(id: number): Observable<HttpClientResult<void>> {
    return this._http.put(
      `${this._getProfileUrl}/address/${id}/addToDefault`,
      {}
    ) as Observable<HttpClientResult<void>>;
  }

  /*================= userAddress ================================*/

  addWithdrawRequest(
    dto: WithdrawRequestDto
  ): Observable<HttpClientResult<void>> {
    return this._http.post(
      `${this._getProfileUrl}/withdraw`,
      dto
    ) as Observable<HttpClientResult<void>>;
  }

  cancelWithdrawRequest(dto: {
    id: number;
  }): Observable<HttpClientResult<void>> {
    return this._http.post(
      `${this._getProfileUrl}/withdraw/cancel`,
      dto
    ) as Observable<HttpClientResult<void>>;
  }

  getWithdrawRequests(
    page: number,
    limit: number
  ): Observable<
    HttpClientResult<PaginationViewModel<WithdrawRequestViewModel>>
  > {
    return this._http.get(
      `${this._getProfileUrl}/withdrawRequest?offset=${page}&&limit=${limit}`
    ) as Observable<
      HttpClientResult<PaginationViewModel<WithdrawRequestViewModel>>
    >;
  }

  /* ---------------------------------- return requests ---------------------------------------  */

  getReturnReasons(): Observable<HttpClientResult<ReturnReasonViewModel[]>> {
    return this._http.get(`${this._getProfileUrl}/returnReason`) as Observable<
      HttpClientResult<ReturnReasonViewModel[]>
    >;
  }

  getReturnRequests(
    page: number,
    limit: number,
    status?: ReturnRequestStatusEnum
  ): Observable<HttpClientResult<PaginationViewModel<ReturnRequestViewModel>>> {
    return this._http.get(
      `${this._getProfileUrl}/returnRequest?offset=${page}&&limit=${limit}${
        status != undefined ? '&&status=' + status : ''
      }`
    ) as Observable<
      HttpClientResult<PaginationViewModel<ReturnRequestViewModel>>
    >;
  }

  addReturnRequest(dto: ReturnRequestDto): Observable<HttpClientResult<void>> {
    return this._http.post(
      `${this._getProfileUrl}/returnOrder`,
      dto
    ) as Observable<HttpClientResult<void>>;
  }

  cancelReturnRequest(dto: { id: number }): Observable<HttpClientResult<void>> {
    return this._http.post(
      `${this._getProfileUrl}/returnOrder/cancel`,
      dto
    ) as Observable<HttpClientResult<void>>;
  }

  getOrdersCanReturn(
    fromDate: string = '',
    toDate: string = '',
    search: string = ''
  ): Observable<HttpClientResult<OrderCanReturnViewModel[]>> {
    return this._http.get(
      `${this._getProfileUrl}/orders/paidUnreturned?fromDate=${fromDate}&toDate=${toDate}&search=${search}`
    ) as Observable<HttpClientResult<OrderCanReturnViewModel[]>>;
  }

  increaseWallet(amount: number): Observable<string> {
    return this._http.post(
      `${this._getProfileUrl}/payment/increaseWallet?amount=${amount}`,
      {}
    ) as Observable<string>;
  }
}
