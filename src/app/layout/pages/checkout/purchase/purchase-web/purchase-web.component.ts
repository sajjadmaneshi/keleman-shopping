import { Component, OnDestroy } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { BasketRepository } from '../../data/repositories/basket.repository';
import { BasketCheckoutViewModel } from '../../data/models/basket-checkout.view-model';
import { BasketService } from '../../services/basket.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'keleman-purchase-web',
  templateUrl: './purchase-web.component.html',
})
export class PurchaseWebComponent implements OnDestroy {
  checkout!: BasketCheckoutViewModel;
  addressId!: number;
  billId!: number;
  destroy$ = new Subject<void>();

  constructor(
    public checkoutService: CheckoutService,
    private _basketService: BasketService,
    private _router: Router,
    private _basketRepository: BasketRepository
  ) {
    this._basketService.basketCheckout$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.checkout = res;
      });
    this._basketService.delivaryAddress$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.addressId = res!;
      });
    this._basketService.billId
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.billId = res!;
      });
  }

  getPreFactor() {
    this._basketRepository
      .getReport()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        const fileUrl = URL.createObjectURL(res);
        window.open(fileUrl, '_blank');
      });
  }

  submitPay() {
    this._router.navigate(['/callback'], {
      queryParams: { billid: this.billId, status: 1 },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
