import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasketService } from './services/basket.service';
import { LoadingService } from '../../../../common/services/loading.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  isBasketFull = false;
  destory$ = new Subject<void>();
  constructor(
    private _basketService: BasketService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadBasketData();
    this.loadingService.startLoading('read', 'basketFull');
    this._basketService.cartCount$.pipe(takeUntil(this.destory$)).subscribe({
      next: (result) => {
        this.isBasketFull = result > 0;
        setTimeout(() => {
          this.loadingService.stopLoading('read', 'basketFull');
        }, 1000);
      },
      error: () => this.loadingService.stopLoading('read', 'basketFull'),
    });
  }

  private loadBasketData(): void {
    this._basketService.basket();
    this._basketService.checkout();
    this._basketService.paymentGateways();
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
