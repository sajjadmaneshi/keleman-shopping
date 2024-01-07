import { Component, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';
import { LoadingService } from '../../../../../common/services/loading.service';
import { Subject, takeUntil } from 'rxjs';
import { BasketRepository } from '../data/repositories/basket.repository';

@Component({
  selector: 'keleman-bank-callback',
  standalone: true,
  imports: [MatIconModule, RouterLink, NgClass, AsyncPipe],
  templateUrl: './bank-callback.component.html',
  styleUrl: './bank-callback.component.scss',
})
export class BankCallbackComponent implements OnDestroy {
  destroy$ = new Subject<void>();
  paymentResult!: PaymentResult;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _basketRepository: BasketRepository,
    public readonly loadingService: LoadingService
  ) {
    this._getParamsFromRoute();
  }

  private _getParamsFromRoute() {
    this._activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.paymentResult = new PaymentResult(
          +result['billid'],
          +result['status']
        );
        this.loadingService.startLoading('add', 'verify');
      });
  }

  getFactor() {
    this._basketRepository
      .getReport(this.paymentResult.billId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        const fileUrl = URL.createObjectURL(res);
        window.open(fileUrl, '_blank');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

export class PaymentResult {
  constructor(public billId: number, public status: number) {}
}
