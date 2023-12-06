import { Component, OnDestroy } from '@angular/core';
import { GuestBasketService } from '../guest-basket.service';
import { ProductDetailViewModel } from '../../products/data/models/view-models/product-detail.view-model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'keleman-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnDestroy {
  destroy$ = new Subject<void>();
  summary: { product: ProductDetailViewModel; count: number }[] = [];
  constructor(private _basketService: GuestBasketService) {
    this._basketService.basket$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.summary = res.products;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
