import { PaymentEnum } from '../../payment/payment-gateway/payment.enum';

export class PaymentGatewayViewModel {
  constructor(
    public id: number,
    public name: string,
    public enName: PaymentEnum
  ) {}
}
