import { Component, OnDestroy } from '@angular/core';
import { BasketRepository } from '../data/repositories/basket.repository';
import { BasketItemViewModel } from '../data/models/basket-item.view-model';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { GuestBasketModel } from '../data/models/guest-basket.model';
import { BasketService } from '../basket.service';

@Component({
  selector: 'keleman-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  providers: [BasketRepository],
})
export class BasketComponent implements OnDestroy {
  basketItems!: GuestBasketModel;
  destroy$ = new Subject<void>();
  constructor(
    private _repository: BasketRepository,
    private _basketService: BasketService
  ) {
    this._getBasketItems();
  }

  private _getBasketItems() {
    const getBasketItems$ = this._basketService.basket$
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.basketItems = result;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
