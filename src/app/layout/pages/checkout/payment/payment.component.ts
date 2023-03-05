import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AttachReceiptDialogComponent } from './attach-receipt-dilog/attach-receipt-dialog.component';

@Component({
  selector: 'keleman-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  constructor(private _dialog: MatDialog) {}

  openDialog() {
    this._dialog.open(AttachReceiptDialogComponent, {
      width: '800px',
      autoFocus: false,
      panelClass: 'custom-mat-dialog',
    });
  }
}
