import { Component, OnDestroy } from '@angular/core';
import { BasketRepository } from '../data/repositories/basket.repository';
import { BasketItemViewModel } from '../data/models/basket-item.view-model';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { GuestBasketModel } from '../data/models/guest-basket.model';
import { GuestBasketService } from '../guest-basket.service';
import { BasketService } from '../purchase/basket.service';
import { BasketViewModel } from '../data/models/basket.view-model';
import { LoadingService } from '../../../../../common/services/loading.service';

@Component({
  selector: 'keleman-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  providers: [BasketRepository],
})
export class BasketComponent implements OnDestroy {
  guestBasketItems!: GuestBasketModel;
  basketItems!: BasketViewModel;
  destroy$ = new Subject<void>();
  constructor(
    private _repository: BasketRepository,
    private _guestBasketService: GuestBasketService,
    public basketService: BasketService,
    public loadingService: LoadingService
  ) {
    this._getBasketItems();
  }

  private _getBasketItems() {
    const getBasketItems$ = this._guestBasketService.basket$
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.guestBasketItems = result;
      });
    this.basketService.basketItems.subscribe((result) => {
      this.basketItems = result!;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
