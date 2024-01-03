import { Component, OnDestroy } from '@angular/core';

import { BasketCheckoutViewModel } from '../../../data/models/basket-checkout.view-model';
import { ShippingCostViewModel } from '../../../data/models/shipping-cost.view-model';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../../../../shared/services/auth/auth.service';
import { BasketService } from '../../../services/basket.service';

@Component({
  selector: 'keleman-main-purchase',
  templateUrl: './main-purchase.component.html',
})
export class MainPurchaseComponent implements OnDestroy {
  destroy$ = new Subject<void>();
  totalPrice: number = 0;
  shippingCost!: ShippingCostViewModel;
  checkoutDetails = new BasketCheckoutViewModel(0, 0, 0, 0);
  isLoggedIn = false;

  constructor(
    private _basketService: BasketService,
    private readonly _authService: AuthService
  ) {
    this._authService.isLoggedIn$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.isLoggedIn = res));

    this._basketService.basketCheckout$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.checkoutDetails = res;
      });

    this._basketService.shippingCost$
      .pipe(takeUntil(this.destroy$))
      .subscribe((shippingCost) => {
        this.shippingCost = shippingCost!;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
