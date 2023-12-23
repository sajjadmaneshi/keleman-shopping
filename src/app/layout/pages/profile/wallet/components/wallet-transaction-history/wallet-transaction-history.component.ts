import { Component, OnDestroy } from '@angular/core';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { WalletTransactionViewModel } from '../../../data/view-models/wallet-transaction.view-model';
import { ProfileRepository } from '../../../data/profile.repository';
import { WalletTransactionStatusEnum } from '../../../data/enums/wallet-transaction-status.enum';
import { PersianDateTimeService } from '../../../../../../shared/services/date-time/persian-datetime.service';
import { LoadingService } from '../../../../../../../common/services/loading.service';

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

  constructor(
    private readonly _profileRepositoy: ProfileRepository,
    public readonly persianDateTimeService: PersianDateTimeService,
    public readonly loadingService: LoadingService
  ) {
    this.loadingService.startLoading('read', 'walletTransactions');
    this.getTransactions();
  }

  public getTransactions(status?: WalletTransactionStatusEnum) {
    this.status = status;
    this._profileRepositoy
      .getWalletTransactions(this.page - 1, this.limit, status)
      .pipe(
        tap(() =>
          this.loadingService.stopLoading('read', 'walletTransactions')
        ),
        takeUntil(this.destroy$),
        map((t) => t.result!)
      )
      .subscribe({
        next: (res) => {
          this.transactions = [...res.items];
          this.totalElement = res.totalElements;
        },
        error: () =>
          this.loadingService.stopLoading('read', 'walletTransactions'),
      });
  }

  pageChange($event: number) {
    this.page = $event;
    this.getTransactions(this.status);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
