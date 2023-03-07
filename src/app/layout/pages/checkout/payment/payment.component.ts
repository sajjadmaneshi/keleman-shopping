import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AttachReceiptDialogComponent } from './attach-receipt-dilog/attach-receipt-dialog.component';
import { AttachChequeDialogComponent } from './attach-cheque-dialog/attach-cheque-dialog.component';

@Component({
  selector: 'keleman-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  constructor(private _dialog: MatDialog) {}

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
}
