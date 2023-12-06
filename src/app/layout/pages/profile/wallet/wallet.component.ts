import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private _matDialog: MatDialog) {}

  openWithdrawRequestDialog() {
    this._matDialog
      .open(WithdrawRequestDialogComponent, {
        width: '500px',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.updateRequests = res;
        }
      });
  }

  printDiv() {
    const content = this.printableContent.nativeElement.innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow?.document.open();
    printWindow?.document.write(`
      <html>
        <head>
          <title>Print</title>
        </head>
        <body id="printable-content">
          ${content}
        </body>
      </html>
    `);
    printWindow?.document.close();
    printWindow?.print();
  }

  showRequests() {
    this.showRequest = true;
  }
}
