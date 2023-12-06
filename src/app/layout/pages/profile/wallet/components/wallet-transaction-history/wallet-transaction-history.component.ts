import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { WalletTransactionViewModel } from '../../../data/view-models/wallet-transaction.view-model';
import { ProfileRepository } from '../../../data/profile.repository';
import { WalletTransactionStatusEnum } from '../../../data/enums/wallet-transaction-status.enum';
import { PersianDateTimeService } from '../../../../../../shared/services/date-time/persian-datetime.service';

@Component({
  selector: 'keleman-wallet-transaction-history',
  templateUrl: './wallet-transaction-history.component.html',
  styleUrls: ['./wallet-transaction-history.component.scss'],
})
export class WalletTransactionHistoryComponent implements OnDestroy {
  walletTransactionStatus = WalletTransactionStatusEnum;

  status: WalletTransactionStatusEnum | undefined;
  transactions: WalletTransactionViewModel[] = [];
  totalElement = 0;

  destroy$ = new Subject<void>();
  page = 1;
  limit = 10;

  isLoading = true;

  @Output() print = new EventEmitter();

  constructor(
    private readonly _profileRepositoy: ProfileRepository,
    public readonly persianDateTimeService: PersianDateTimeService
  ) {
    this.getTransactions();
  }

  public getTransactions(status?: WalletTransactionStatusEnum) {
    this.status = status;
    this._profileRepositoy
      .getWalletTransactions(this.page - 1, this.limit, status)
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$),
        map((t) => t.result!)
      )
      .subscribe((res) => {
        this.transactions = [...res.items];
        this.totalElement = res.totalElements;
      });
  }

  pageChange($event: number) {
    this.page = $event;
    this.getTransactions(this.status);
  }

  trackByFn(index: number, item: WalletTransactionViewModel) {
    return item.id;
  }

  onPrint() {
    this.print.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
