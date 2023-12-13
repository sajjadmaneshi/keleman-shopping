import { Component, OnDestroy } from '@angular/core';
import { GuestBasketService } from '../guest-basket.service';
import { ProductDetailViewModel } from '../../products/data/models/view-models/product-detail.view-model';
import { Subject, takeUntil } from 'rxjs';
import { BasketService } from '../purchase/basket.service';
import { BasketItemViewModel } from '../data/models/basket-item.view-model';

@Component({
  selector: 'keleman-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnDestroy {
  destroy$ = new Subject<void>();
  summary: { product: ProductDetailViewModel; count: number }[] = [];
  basketItems: BasketItemViewModel[] = [];
  constructor(
    private _guestBasketService: GuestBasketService,
    public basketService: BasketService
  ) {
    this._guestBasketService.basket$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.summary = res.products;
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
