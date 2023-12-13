import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AttachReceiptDialogComponent } from './attach-receipt-dilog/attach-receipt-dialog.component';
import { AttachChequeDialogComponent } from './attach-cheque-dialog/attach-cheque-dialog.component';

import { Subject, Subscription, takeUntil, tap } from 'rxjs';
import { BasketService } from '../purchase/basket.service';
import { PaymentGatewayViewModel } from '../data/models/payment-gateway.view-model';

@Component({
  selector: 'keleman-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  isLoading = false;
  destroy$ = new Subject<void>();
  paymentGateWays: PaymentGatewayViewModel[] = [];
  sunbscriptions = new Subscription();
  constructor(
    private _dialog: MatDialog,
    private _basketService: BasketService
  ) {
    this._basketService.paymentGateways
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        this.paymentGateWays = result;
      });
  }

  openAttachReceiptDialog(): void {
    this._dialog.open(AttachReceiptDialogComponent, {
      width: '800px',
      autoFocus: false,
      panelClass: 'custom-mat-dialog',
    });
  }

  openAttachChequeDialog() {
    this._dialog.open(AttachChequeDialogComponent, {
      width: '800px',

      autoFocus: false,
      panelClass: 'custom-mat-dialog',
    });
  }

  private _getPaymentGateways() {}
}
