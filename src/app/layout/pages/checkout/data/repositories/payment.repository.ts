import { Injectable } from '@angular/core';
import { DataService } from '../../../../../shared/services/data.service';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { PaymentGatewayViewModel } from '../models/payment-gateway.view-model';
import { VerifyPaymentDto } from '../dto/verify-payment.dto';
import { PayResultViewModel } from '../models/pay-result.view-model';
import { AttachChequeDto } from '../dto/attach-cheque.dto';
import { AttachReceiptDto } from '../dto/attach-receipt.dto';
import { HttpRequestOptions } from '../../../../../shared/data/models/http/http-request-options';

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
    return this._http.post(`${this._getCartUrl}/verify`, dto) as Observable<
      HttpClientResult<boolean>
    >;
  }

  attachCheque(billId: number, dto: AttachChequeDto[]): Observable<boolean> {
    return this._http.post(
      `${this._getCartUrl}/cheque/${billId}`,
      dto
    ) as Observable<boolean>;
  }

  attachRecipt(billId: number, dto: AttachReceiptDto[]): Observable<boolean> {
    return this._http.post(
      `${this._getCartUrl}/receipt/${billId}`,
      dto
    ) as Observable<boolean>;
  }

  uploadFile(billId: number, fileData: FormData): Observable<string> {
    return this._http.post(`${this._getCartUrl}/upload/${billId}`, fileData, {
      isBodyFormData: false,
    } as HttpRequestOptions) as Observable<string>;
  }
}
