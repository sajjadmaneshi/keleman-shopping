import { Injectable } from '@angular/core';
import { DataService } from '../../../../../../shared/services/data.service';
import { PaymentGatewayViewModel } from '../models/payment-gateway.view-model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaymentGatewayRepository extends DataService<PaymentGatewayViewModel> {
  constructor(_http: HttpClient) {
    super('payment-gateway', _http);
  }
}
