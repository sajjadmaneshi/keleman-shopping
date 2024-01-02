import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { WithdrawRequestViewModel } from '../../../data/view-models/withdraw-request.view-model';
import { ProfileRepository } from '../../../data/profile.repository';
import { PersianDateTimeService } from '../../../../../../shared/services/date-time/persian-datetime.service';
import { WithdrawRequestStatusEnum } from '../../../data/enums/withdraw-request-status.enum';
import { AlertDialogComponent } from '../../../../../../shared/components/alert-dialog/alert-dialog.component';
import { AlertDialogDataModel } from '../../../../../../shared/components/alert-dialog/alert-dialog-data.model';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../../../../../shared/components/snack-bar/snack-bar.service';
import { LoadingService } from '../../../../../../../common/services/loading.service';

@Component({
  selector: 'keleman-withdraw-request-history',
  templateUrl: './withdraw-request-history.component.html',
  styleUrls: ['./withdraw-request-history.component.scss'],
})
export class WithdrawRequestHistoryComponent implements OnDestroy, OnChanges {
  @Input('update') update = false;
  withdrawRequests: WithdrawRequestViewModel[] = [];
  totalElemnts: number = 0;
  destroy$ = new Subject<void>();
  page = 1;
  limit = 10;
  updateRequests = false;
  withdrawRequestStatus = WithdrawRequestStatusEnum;

  constructor(
    private readonly _profileRepository: ProfileRepository,
    private readonly _dialog: MatDialog,
    private readonly _snackBar: SnackBarService,
    public readonly persianDateTimeService: PersianDateTimeService,
    public readonly loadingService: LoadingService
  ) {
    this.loadingService.startLoading('read', 'withdrawRequests');
    this._getRequests();
  }

  private _getRequests() {
    this._profileRepository
      .getWithdrawRequests(this.page - 1, this.limit)
      .pipe(
        tap(() => {
          this.loadingService.stopLoading('read', 'withdrawRequests');
          this.updateRequests = false;
        }),
        takeUntil(this.destroy$),
        map((result) => result.result!)
      )
      .subscribe({
        next: (request) => {
          this.withdrawRequests = [...request.items!];
          this.totalElemnts = request.totalElements;
        },
        error: () =>
          this.loadingService.stopLoading('read', 'withdrawRequests'),
      });
  }

  private _showSuccessMessage() {
    this._snackBar.showWarningSnackBar('درخواستش ما با موفقیت لغو گردید ');
    this._getRequests();
  }

  pageChange(page: number) {
    this.page = page;
    this._getRequests();
  }

  public getAcceptBeforeCancell($event: any, reuestId: number) {
    $event.stopPropagation();
    this._dialog.open(AlertDialogComponent, {
      autoFocus: false,
      data: {
        message: 'آیا  از لغو درخواست  مطمئن می باشید؟',
        callBackButtonText: 'لغو ',
        cancelButtonText: 'انصراف',
        callBackFunction: () => this.cancelRequest(reuestId),
      } as AlertDialogDataModel,
    });
  }

  cancelRequest(id: number) {
    this.loadingService.startLoading('add', 'cancelWaaletRequest');
    this._profileRepository
      .cancelWithdrawRequest({ id })
      .pipe(
        tap(() =>
          this.loadingService.stopLoading('add', 'cancelWaaletRequest')
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => this._showSuccessMessage(),
        error: () =>
          this.loadingService.stopLoading('add', 'cancelWaaletRequest'),
      });
  }

  ngOnChanges(): void {
    this.updateRequests = this.update;
    if (this.updateRequests) this._getRequests();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
