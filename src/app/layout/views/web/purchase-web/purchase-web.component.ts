import { Component } from '@angular/core';
import { KelemanPriceComponent } from '../../../../shared/components/keleman-price/keleman-price.component';
import { DecimalPipe } from '@angular/common';
import { CheckoutService } from '../../../pages/checkout/services/checkout.service';

@Component({
  selector: 'keleman-purchase-web',
  templateUrl: './purchase-web.component.html',
  standalone: true,
  imports: [KelemanPriceComponent, DecimalPipe],
  styles: [
    `
      .purchase {
        min-height: 240px !important;
      }
    `,
  ],
})
export class PurchaseWebComponent {
  constructor(public checkoutService: CheckoutService) {}
}
