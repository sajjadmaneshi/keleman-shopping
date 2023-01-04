import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WithdrawRequestDialogComponent } from './withdraw-request-dialog/withdraw-request-dialog.component';

@Component({
  selector: 'keleman-decrease-wallet',
  templateUrl: './decrease-wallet.component.html',
  styleUrls: ['./decrease-wallet.component.scss'],
})
export class DecreaseWalletComponent {
  columns = ['#', 'تاریخ', 'شماره', 'درخواست', 'مبلغ', 'وضعیت'];
  rows = [
    {
      id: 1,
      date: '2022',
      number: '1234',
      req: 'test',
      amount: '2000',
      status: 'true',
    },
    {
      id: 1,
      date: '2022',
      number: '1234',
      req: 'test',
      amount: '2000',
      status: 'true',
    },
  ];
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(WithdrawRequestDialogComponent, {
      width: '700px',
      panelClass: 'custom-container',
    });
  }
}
