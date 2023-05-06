import { Component } from '@angular/core';
import { PriceComponent } from '../../../../../shared/components/price/price.component';
import { DecimalPipe } from '@angular/common';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'keleman-purchase-web',
  templateUrl: './purchase-web.component.html',
})
export class PurchaseWebComponent {
  constructor(public checkoutService: CheckoutService) {}
}
