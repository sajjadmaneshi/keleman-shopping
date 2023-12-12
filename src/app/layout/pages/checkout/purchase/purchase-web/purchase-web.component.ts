import { Component, Input } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { BasketService } from '../basket.service';

@Component({
  selector: 'keleman-purchase-web',
  templateUrl: './purchase-web.component.html',
})
export class PurchaseWebComponent {
  constructor(
    public checkoutService: CheckoutService,
    public basketService: BasketService
  ) {}
}
