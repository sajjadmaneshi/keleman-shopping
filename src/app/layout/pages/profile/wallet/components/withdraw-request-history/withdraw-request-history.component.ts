import { Component, OnDestroy } from '@angular/core';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { WithdrawRequestViewModel } from '../../../data/view-models/withdraw-request-view.model';
import { ProfileRepository } from '../../../data/profile.repository';
import { PersianDateTimeService } from '../../../../../../shared/services/date-time/persian-datetime.service';

@Component({
  selector: 'keleman-withdraw-request-history',
  templateUrl: './withdraw-request-history.component.html',
  styleUrls: ['./withdraw-request-history.component.scss'],
})
export class WithdrawRequestHistoryComponent implements OnDestroy {
  withdrawRequests: WithdrawRequestViewModel[] = [];
  totalElemnts: number = 0;
  isLoading = true;
  detroy$ = new Subject<void>();
  page = 1;
  limit = 10;

  constructor(
    private _profileRepository: ProfileRepository,
    public readonly persianDateTimeService: PersianDateTimeService
  ) {
    this._getRequests();
  }

  private _getRequests() {
    this._profileRepository
      .getWithdrawRequests()
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.detroy$),
        map((result) => result.result!)
      )
      .subscribe((request) => {
        this.withdrawRequests = [...request.items!];
        this.totalElemnts = request.totalElements;
      });
  }

  trackByFn(index: number, item: WithdrawRequestViewModel) {
    return item.id;
  }
  pageChange(page: number) {}

  ngOnDestroy(): void {
    this.detroy$.next();
    this.detroy$.complete();
  }
}
