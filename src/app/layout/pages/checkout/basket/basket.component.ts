import { Component, OnDestroy } from '@angular/core';
import { BasketRepository } from '../data/repositories/basket.repository';
import { BasketItemViewModel } from '../data/models/basket-item.view-model';
import { Subject } from 'rxjs';
import { LoadingService } from '../../../../../common/services/loading.service';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'keleman-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  providers: [BasketRepository],
})
export class BasketComponent implements OnDestroy {
  basketItems: BasketItemViewModel[] = [];
  destroy$ = new Subject<void>();
  isLoggedIn = false;

  constructor(
    private _authService: AuthService,
    public basketService: BasketService,
    public loadingService: LoadingService
  ) {
    this._authService.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = res;
    });
    this._getBasketItems();
  }

  private _getBasketItems() {
    this.basketService.basketItems$.subscribe((result) => {
      this.basketItems = result!;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  removeItem(basketItem: BasketItemViewModel) {
    if (this.isLoggedIn) {
      const indexToRemove = this.basketItems.findIndex(
        (item) => item.product.id === basketItem.product.id
      );
      if (indexToRemove !== -1) {
        this.basketItems.splice(indexToRemove, 1);
      }
    }
    const updatedProductCount =
      this.basketService.cartCount$.value - basketItem.count;
    this.basketService.cartCount$.next(updatedProductCount);
    this.basketService.checkout();
  }
}
