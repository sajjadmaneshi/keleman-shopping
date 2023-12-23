import { Component } from '@angular/core';
import { GuestBasketService } from '../../../guest-basket.service';
import { BasketService } from '../../basket.service';

import { BasketCheckoutViewModel } from '../../../data/models/basket-checkout.view-model';
import { ShippingCostViewModel } from '../../../data/models/shipping-cost-view.model';
import { Subject, combineLatest, takeUntil } from 'rxjs';

@Component({
  selector: 'keleman-main-purchase',
  templateUrl: './main-purchase.component.html',
  styleUrls: ['./main-purchase.component.scss'],
})
export class MainPurchaseComponent {
  destroy$ = new Subject();

  totalPrice: number = 0;
  shippingCost!: ShippingCostViewModel | null;
  checkoutDetails = new BasketCheckoutViewModel(0, 0, 0, 0);

  constructor(
    private _guestBasketService: GuestBasketService,
    private _basketService: BasketService
  ) {
    combineLatest(
      this._guestBasketService.totalPrice$,
      this._basketService.basketCheckout,
      this._basketService.shippingCost
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(([totalPrice, basketCheckout, shippingCost]) => {
        this.totalPrice = totalPrice;
        this.checkoutDetails = basketCheckout;
        this.shippingCost = shippingCost;
      });
  }
}
