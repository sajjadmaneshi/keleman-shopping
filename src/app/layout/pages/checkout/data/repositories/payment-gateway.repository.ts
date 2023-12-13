import { Observable } from 'rxjs';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { PaymentGatewayViewModel } from '../models/payment-gateway.view-model';
import { Injectable } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaymentGatewayRepository extends DataService<PaymentGatewayViewModel> {
  constructor(_http: HttpClient) {
    super('paymentGateway', _http);
  }
  getPaymentGateways(): Observable<
    HttpClientResult<PaymentGatewayViewModel[]>
  > {
    return this._http.get(`${this._getCartUrl}`) as Observable<
      HttpClientResult<PaymentGatewayViewModel[]>
    >;
  }
}
