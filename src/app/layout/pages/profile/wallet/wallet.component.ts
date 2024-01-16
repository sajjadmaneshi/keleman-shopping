import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WithdrawRequestDialogComponent } from './components/withdraw-request-dialog/withdraw-request-dialog.component';
import { ProfileRepository } from '../data/profile.repository';
import { Subject, takeUntil, tap } from 'rxjs';
import { DOCUMENT } from '@angular/common';

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
  increaseAmount!: number;
  submitLoading = false;
  destroy$ = new Subject<void>();
  refId: string = '';
  constructor(
    private readonly _matDialog: MatDialog,

    private _profileRepository: ProfileRepository,
    @Inject(DOCUMENT) private document: Document
  ) {}

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

  increaseWallet() {
    if (this.increaseAmount > 0) {
      this.submitLoading = true;
      this._profileRepository
        .increaseWallet(this.increaseAmount)
        .pipe(
          tap(() => (this.submitLoading = false)),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (result) => this._mellatPay(result),
          error: () => (this.submitLoading = false),
        });
    }
  }

  private _mellatPay(refId: any) {
    var form = this.document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute(
      'action',
      'https://bpm.shaparak.ir/pgwchannel/startpay.mellat'
    );
    form.setAttribute('target', '_self');
    var hiddenField = this.document.createElement('input');
    hiddenField.setAttribute('name', 'RefId');
    hiddenField.setAttribute('value', refId);
    form.appendChild(hiddenField);
    this.document.body.appendChild(form);
    form.submit();
    this.document.body.removeChild(form);
  }

  showRequests() {
    this.showRequest = true;
  }
}
