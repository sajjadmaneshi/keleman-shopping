import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AttachReceiptDialogComponent } from './attach-receipt-dilog/attach-receipt-dialog.component';
import { AttachChequeDialogComponent } from './attach-cheque-dialog/attach-cheque-dialog.component';
import { PaymentGatewayRepository } from './data/repositories/payment-gateway.repository';
import { PaymentGatewayViewModel } from './data/models/payment-gateway.view-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'keleman-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [PaymentGatewayRepository],
})
export class PaymentComponent {
  paymentGateWays: PaymentGatewayViewModel[] = [];
  sunbscriptions = new Subscription();
  constructor(
    private _dialog: MatDialog,
    private _repository: PaymentGatewayRepository
  ) {
    this._getPaymentGateways();
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

  private _getPaymentGateways() {
    const paymentGayeWays$ = this._repository.getAll().subscribe((result) => {
      this.paymentGateWays = result;
    });
    this.sunbscriptions.add(paymentGayeWays$);
  }
}
