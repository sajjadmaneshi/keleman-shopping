import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WithdrawRequestDialogComponent } from './components/withdraw-request-dialog/withdraw-request-dialog.component';

@Component({
  selector: 'keleman-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent {
  @ViewChild('printableContent', { static: false })
  printableContent!: ElementRef;
  showRequest = false;
  updateRequests = false;
  constructor(private readonly _matDialog: MatDialog) {}

  openWithdrawRequestDialog() {
    this._matDialog
      .open(WithdrawRequestDialogComponent, {
        width: '500px',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) this.updateRequests = res;
      });
  }

  showRequests() {
    this.showRequest = true;
  }
}
