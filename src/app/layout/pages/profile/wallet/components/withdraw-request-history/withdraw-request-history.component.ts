import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { map, Subject, take, takeUntil, tap } from 'rxjs';
import { WithdrawRequestViewModel } from '../../../data/view-models/withdraw-request-view.model';
import { ProfileRepository } from '../../../data/profile.repository';
import { PersianDateTimeService } from '../../../../../../shared/services/date-time/persian-datetime.service';
import { WithdrawRequestStatusEnum } from '../../../data/enums/withdraw-request-status.enum';
import { AlertDialogComponent } from '../../../../../../shared/components/alert-dialog/alert-dialog.component';
import { AlertDialogDataModel } from '../../../../../../shared/components/alert-dialog/alert-dialog-data.model';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../../../../../shared/components/snack-bar/snack-bar.service';

@Component({
  selector: 'keleman-withdraw-request-history',
  templateUrl: './withdraw-request-history.component.html',
  styleUrls: ['./withdraw-request-history.component.scss'],
})
export class WithdrawRequestHistoryComponent implements OnDestroy, OnChanges {
  @Input('update') update = false;
  withdrawRequests: WithdrawRequestViewModel[] = [];
  totalElemnts: number = 0;
  isLoading = true;
  detroy$ = new Subject<void>();
  page = 1;
  limit = 10;
  cancelLoading = false;
  updateRequests = false;
  withdrawRequestStatus = WithdrawRequestStatusEnum;

  constructor(
    private _profileRepository: ProfileRepository,
    private readonly _dialog: MatDialog,
    private readonly _snackBar: SnackBarService,
    public readonly persianDateTimeService: PersianDateTimeService
  ) {
    this._getRequests();
  }

  private _getRequests() {
    this._profileRepository
      .getWithdrawRequests(this.page - 1, this.limit)
      .pipe(
        tap(() => {
          this.isLoading = false;
          this.updateRequests = false;
        }),
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

  private _showSuccessMessage() {
    this._snackBar.showWarningSnackBar('درخواستش ما با موفقیت لغو گردید ');
    this._getRequests();
  }

  pageChange(page: number) {
    this.page = page;
    this._getRequests();
  }

  ngOnDestroy(): void {
    this.detroy$.next();
    this.detroy$.complete();
  }

  public getAcceptBeforeRemove($event: any, reuestId: number) {
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
    this.cancelLoading = true;
    this._profileRepository
      .cancelWithdrawRequest({ id })
      .pipe(
        tap(() => (this.cancelLoading = false)),
        takeUntil(this.detroy$)
      )
      .subscribe(() => this._showSuccessMessage());
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateRequests = this.update;
    if (this.updateRequests) this._getRequests();
  }
}
