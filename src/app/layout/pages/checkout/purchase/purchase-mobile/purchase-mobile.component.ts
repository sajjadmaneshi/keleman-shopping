import { Component, Input } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { BasketCheckoutViewModel } from '../../data/models/basket-checkout.view-model';
import { PurchaseWebComponent } from '../purchase-web/purchase-web.component';

@Component({
  selector: 'keleman-purchase-mobile',
  templateUrl: './purchase-mobile.component.html',
  styleUrls: ['./purchase-mobile.component.scss'],
})
export class PurchaseMobileComponent extends PurchaseWebComponent {}
