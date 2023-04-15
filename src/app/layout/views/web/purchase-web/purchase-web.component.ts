import { Component } from '@angular/core';
import { PriceComponent } from '../../../../shared/components/price/price.component';
import { DecimalPipe } from '@angular/common';
import { CheckoutService } from '../../../pages/checkout/services/checkout.service';

@Component({
  selector: 'keleman-purchase-web',
  templateUrl: './purchase-web.component.html',
  standalone: true,
  imports: [PriceComponent, DecimalPipe],
})
export class PurchaseWebComponent {
  constructor(public checkoutService: CheckoutService) {}
}
