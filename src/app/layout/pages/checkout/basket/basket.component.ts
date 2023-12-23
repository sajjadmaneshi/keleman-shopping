import { Component, OnDestroy } from '@angular/core';
import { BasketRepository } from '../data/repositories/basket.repository';
import { BasketItemViewModel } from '../data/models/basket-item.view-model';
import { Subject, takeUntil } from 'rxjs';
import { GuestBasketModel } from '../data/models/guest-basket.model';
import { GuestBasketService } from '../guest-basket.service';
import { BasketService } from '../purchase/basket.service';
import { LoadingService } from '../../../../../common/services/loading.service';

@Component({
  selector: 'keleman-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  providers: [BasketRepository],
})
export class BasketComponent implements OnDestroy {
  guestBasketItems!: GuestBasketModel;
  basketItems: BasketItemViewModel[] = [];
  destroy$ = new Subject<void>();

  constructor(
    private _guestBasketService: GuestBasketService,
    public basketService: BasketService,
    public loadingService: LoadingService
  ) {
    this._getBasketItems();
  }

  private _getBasketItems() {
    this._guestBasketService.basket$
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.guestBasketItems = result;
      });
    this.basketService.basketItems.subscribe((result) => {
      this.basketItems = result!;
      console.log(this.basketItems);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  removeItem(basketItem: BasketItemViewModel) {
    const indexToRemove = this.basketItems.findIndex(
      (item) => item.id === basketItem.id
    );

    if (indexToRemove !== -1) {
      this.basketItems.splice(indexToRemove, 1);

      const updatedProductCount =
        this.basketService.cartCount.value - basketItem.count;

      this.basketService.cartCount.next(updatedProductCount);
    }
  }
}
