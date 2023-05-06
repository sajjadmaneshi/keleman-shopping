import { Component } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'keleman-purchase-mobile',
  templateUrl: './purchase-mobile.component.html',
  styleUrls: ['./purchase-mobile.component.scss'],
})
export class PurchaseMobileComponent {
  constructor(public checkoutService: CheckoutService) {}
}
