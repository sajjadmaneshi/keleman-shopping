import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { PersianDateTimeService } from 'src/app/shared/services/date-time/persian-datetime.service';
import { ProfileRepository } from '../data/profile.repository';
import { CreditTransactionViewModel } from '../data/view-models/credit-transaction.view-model';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';
import { LoadingService } from '../../../../../common/services/loading.service';

@Component({
  selector: 'keleman-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss'],
})
export class CreditsComponent {
  dataSource!: MatTableDataSource<CreditTransactionViewModel>;
  displayedColumns: string[] = [
    'id',
    'description',
    'date',
    'price',
    'checkoutDate',
    'payDate',
    'status',
  ];

  transactions: CreditTransactionViewModel[] = [];
  totalElement = 0;

  destroy$ = new Subject<void>();
  page = 1;
  limit = 10;

  isPaid: boolean | undefined;

  constructor(
    private readonly _profileRepositoy: ProfileRepository,
    public readonly persianDateTimeService: PersianDateTimeService,
    public readonly applicationState: ApplicationStateService,
    public readonly loadingService: LoadingService
  ) {
    this.loadingService.startLoading('read', 'creditTransaction');
    this.getTransactions();
  }

  @ViewChild(MatSort) sort!: MatSort;

  public getTransactions(isPaid?: boolean) {
    this.isPaid = isPaid;
    this._profileRepositoy
      .getCreditTransactions(this.page - 1, this.limit, isPaid)
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'creditTransaction')),
        takeUntil(this.destroy$),
        map((t) => t.result!)
      )
      .subscribe({
        next: (res) => {
          this.transactions = [...res.items];
          this.dataSource = new MatTableDataSource<CreditTransactionViewModel>(
            this.transactions
          );
          this.dataSource.sort = this.sort;
          this.totalElement = res.totalElements;
        },
        error: () =>
          this.loadingService.stopLoading('read', 'creditTransaction'),
      });
  }

  pageChange($event: number) {
    this.page = $event;
    this.getTransactions(this.isPaid);
  }

  trackByFn(index: number, item: CreditTransactionViewModel) {
    return item.id;
  }
}
