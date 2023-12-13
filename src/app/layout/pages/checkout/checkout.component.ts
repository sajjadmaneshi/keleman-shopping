import { Component } from '@angular/core';
import { BasketService } from './purchase/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  constructor(private _basketService: BasketService) {
    this._basketService.getBasket();
    this._basketService.getBasketCheckout();
    this._basketService.getPaymentGateways();
  }
}
