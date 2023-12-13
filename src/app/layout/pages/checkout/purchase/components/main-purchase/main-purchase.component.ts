import { Component, Input } from '@angular/core';
import { GuestBasketService } from '../../../guest-basket.service';
import { BasketService } from '../../basket.service';
import { CheckoutModule } from '../../../checkout.module';
import { BasketCheckoutViewModel } from '../../../data/models/basket-checkout.view-model';

@Component({
  selector: 'keleman-main-purchase',
  templateUrl: './main-purchase.component.html',
  styleUrls: ['./main-purchase.component.scss'],
})
export class MainPurchaseComponent {
  totalPrice: number = 0;
  checkoutDetails = new BasketCheckoutViewModel(0, 0, 0);

  constructor(
    private _guestBasketService: GuestBasketService,
    private _basketService: BasketService
  ) {
    this._guestBasketService.totalPrice$.subscribe((res) => {
      this.totalPrice = res;
    });
    this._basketService.basketCheckout.subscribe((checkout) => {
      this.checkoutDetails = checkout;
    });
  }
}
