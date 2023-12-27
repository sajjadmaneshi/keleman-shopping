import { Component, OnDestroy } from '@angular/core';
import { GuestBasketService } from '../guest-basket.service';
import { ProductDetailViewModel } from '../../products/data/models/view-models/product-detail.view-model';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticatedBasketService } from '../purchase/authenticated-basket.service';
import { BasketItemViewModel } from '../data/models/basket-item.view-model';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'keleman-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnDestroy {
  destroy$ = new Subject<void>();
  summary: { product: ProductDetailViewModel; count: number }[] = [];
  basketItems: BasketItemViewModel[] = [];
  constructor(public basketService: BasketService) {
    this.basketService.basketItems$.subscribe((result) => {
      this.basketItems = result!;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
