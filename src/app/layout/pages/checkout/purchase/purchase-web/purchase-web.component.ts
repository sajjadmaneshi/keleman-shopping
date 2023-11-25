import { Component, Input } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'keleman-purchase-web',
  templateUrl: './purchase-web.component.html',
})
export class PurchaseWebComponent {
  constructor(public checkoutService: CheckoutService) {}
}
