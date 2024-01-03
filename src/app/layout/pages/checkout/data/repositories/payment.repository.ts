import { Injectable } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { PaymentGatewayViewModel } from '../models/payment-gateway.view-model';
import { VerifyPaymentDto } from '../dto/verify-payment.dto';
import { PayResultViewModel } from '../models/pay-result.view-model';

@Injectable()
export class PaymentRepository extends DataService<PaymentGatewayViewModel> {
  constructor(_http: HttpClient) {
    super('payment', _http);
  }

  getPaymentGateways(): Observable<
    HttpClientResult<PaymentGatewayViewModel[]>
  > {
    return this._http.get(`${this._getCartUrl}/gateway`) as Observable<
      HttpClientResult<PaymentGatewayViewModel[]>
    >;
  }
  pay(
    billId: number,
    bankId: number
  ): Observable<HttpClientResult<PayResultViewModel>> {
    return this._http.get(
      `${this._getCartUrl}/${billId}/${bankId}`
    ) as Observable<HttpClientResult<PayResultViewModel>>;
  }
  verify(dto: VerifyPaymentDto): Observable<HttpClientResult<boolean>> {
    return this._http.post(
      `${this._getCartUrl}/verify?userId=${localStorage.getItem('USERID')}`,
      dto
    ) as Observable<HttpClientResult<boolean>>;
  }
}
