import { Component, Input } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { PaymentGatewayViewModel } from '../../data/models/payment-gateway.view-model';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LazyLoadingDirective } from '../../../../../shared/directives/lazy-loading.directive';
import { UserCreditViewModel } from '../../../profile/data/view-models/user-credit.view-model';
import { PaymentEnum } from './payment.enum';

@Component({
  selector: 'keleman-payment-gateway',
  standalone: true,
  imports: [
    AsyncPipe,
    MatProgressSpinnerModule,
    LazyLoadingDirective,
    DecimalPipe,
  ],
  templateUrl: './payment-gateway.component.html',
  styleUrl: './payment-gateway.component.scss',
})
export class PaymentGatewayComponent {
  @Input() gateway!: PaymentGatewayViewModel;
  @Input() credit!: UserCreditViewModel;
  @Input() selected: boolean = false;
  @Input() disabled: boolean = false;

  paymentGatewyEnums = PaymentEnum;
  constructor() {}
}
