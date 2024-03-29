import { Component, OnDestroy } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { BasketRepository } from '../../data/repositories/basket.repository';

import { BasketService } from '../../services/basket.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { LoadingService } from '../../../../../../common/services/loading.service';

@Component({
  selector: 'keleman-purchase-web',
  templateUrl: './purchase-web.component.html',
})
export class PurchaseWebComponent implements OnDestroy {
  billId!: number;
  destroy$ = new Subject<void>();
  paymentGatewayId = -1;

  constructor(
    public readonly checkoutService: CheckoutService,
    public readonly loadingService: LoadingService,
    protected readonly _basketService: BasketService,
    private readonly _basketRepository: BasketRepository
  ) {
    this._basketService.billId
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.billId = res!;
      });
    this._basketService.selectedPaymentGateWay
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result != -1) this.paymentGatewayId = result;
      });
  }

  getPreFactor() {
    this.loadingService.startLoading('read', 'getPreFactor');
    this._basketRepository
      .getReport()
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'getPreFactor')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res) => {
          const fileUrl = URL.createObjectURL(res);
          var a = document.createElement('a');
          a.href = fileUrl;
          a.target = '_blank';
          a.click();
        },
        error: () => this.loadingService.stopLoading('read', 'getPreFactor'),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
