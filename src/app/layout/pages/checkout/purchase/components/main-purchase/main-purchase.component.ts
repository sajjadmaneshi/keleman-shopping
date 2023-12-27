import { Component } from '@angular/core';

import { BasketCheckoutViewModel } from '../../../data/models/basket-checkout.view-model';
import { ShippingCostViewModel } from '../../../data/models/shipping-cost-view.model';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../../../../shared/services/auth/auth.service';
import { BasketService } from '../../../services/basket.service';

@Component({
  selector: 'keleman-main-purchase',
  templateUrl: './main-purchase.component.html',
  styleUrls: ['./main-purchase.component.scss'],
})
export class MainPurchaseComponent {
  destroy$ = new Subject<void>();
  totalPrice: number = 0;
  shippingCost!: ShippingCostViewModel;
  checkoutDetails = new BasketCheckoutViewModel(0, 0, 0, 0);
  isLoggedIn = false;
  constructor(
    private _basketService: BasketService,
    private readonly _authService: AuthService
  ) {
    this._authService.isLoggedIn$.subscribe((res) => (this.isLoggedIn = res));

    this._basketService.basketCheckout$.subscribe((res) => {
      this.checkoutDetails = res;
    });

    this._basketService.shippingCost$
      .pipe(takeUntil(this.destroy$))
      .subscribe((shippingCost) => {
        this.shippingCost = shippingCost!;
      });
  }
}
