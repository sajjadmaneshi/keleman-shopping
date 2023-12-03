import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { WithdrawRequestDialogComponent } from './components/withdraw-request-dialog/withdraw-request-dialog.component';

@Component({
  selector: 'keleman-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent {
  constructor(private _matDialog: MatDialog) {}

  openWithdrawRequestDialog() {
    this._matDialog.open(WithdrawRequestDialogComponent, {
      width: '500px',
    });
  }
}
