import { Component, Input } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'keleman-purchase-mobile',
  templateUrl: './purchase-mobile.component.html',
  styleUrls: ['./purchase-mobile.component.scss'],
})
export class PurchaseMobileComponent {
  @Input() totalPrice: number = 0;
  constructor(public checkoutService: CheckoutService) {}
}
