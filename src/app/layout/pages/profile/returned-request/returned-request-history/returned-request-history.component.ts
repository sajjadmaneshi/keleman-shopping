import { Component, OnDestroy } from '@angular/core';
import { PersianDateTimeService } from '../../../../../shared/services/date-time/persian-datetime.service';
import { ProfileRepository } from '../../data/profile.repository';
import { ReturnRequestViewModel } from '../../data/view-models/return-request.view-model';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { ReturnRequestStatusEnum } from '../../data/enums/return-request-status.enum';
import { AlertDialogComponent } from '../../../../../shared/components/alert-dialog/alert-dialog.component';
import { AlertDialogDataModel } from '../../../../../shared/components/alert-dialog/alert-dialog-data.model';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from '../../../../../../common/services/loading.service';
import { SnackBarService } from '../../../../../shared/components/snack-bar/snack-bar.service';

export interface SelectedStatusFilterReurnRequest {
  id: number;
  status?: ReturnRequestStatusEnum;
  title: string;
}

@Component({
  selector: 'keleman-returned-request-history',
  templateUrl: './returned-request-history.component.html',
})
export class ReturnedRequestHistoryComponent implements OnDestroy {
  destroy$ = new Subject<void>();
  statusEnum = ReturnRequestStatusEnum;
  requests: ReturnRequestViewModel[] = [];
  page = 1;
  totalElements = 0;
  limit = 10;

  selectedStatus: SelectedStatusFilterReurnRequest = { id: 0, title: 'همه' };

  statusMap: SelectedStatusFilterReurnRequest[] = [
    { id: 0, title: 'همه' },
    {
      id: ReturnRequestStatusEnum.SentByUser,
      title: 'درحال بررسی',
      status: ReturnRequestStatusEnum.SentByUser,
    },
    {
      id: ReturnRequestStatusEnum.ReadByAdmin,
      title: 'خوانده شده',
      status: ReturnRequestStatusEnum.ReadByAdmin,
    },
    {
      id: ReturnRequestStatusEnum.ApprovedByAdmin,
      title: 'تایید شده',
      status: ReturnRequestStatusEnum.ApprovedByAdmin,
    },
    {
      id: ReturnRequestStatusEnum.Rejected,
      title: 'ردشده',
      status: ReturnRequestStatusEnum.Rejected,
    },
    {
      id: ReturnRequestStatusEnum.Cancelled,
      title: 'لغو شده',
      status: ReturnRequestStatusEnum.Cancelled,
    },
  ];

  constructor(
    public readonly persianDateTimeService: PersianDateTimeService,
    public readonly loadingService: LoadingService,
    private readonly _profileRepository: ProfileRepository,
    private readonly _dialog: MatDialog,
    private readonly _snackBar: SnackBarService
  ) {
    this.loadingService.startLoading('read', 'returnedRequest');
    this._getRequests();
  }

  private _getRequests() {
    this._profileRepository
      .getReturnRequests(this.page - 1, this.limit, this.selectedStatus.status)
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'returnedRequest')),
        takeUntil(this.destroy$),
        map((result) => result.result!)
      )
      .subscribe({
        next: (result) => {
          this.requests = [...result.items!];
          this.totalElements = result.totalElements;
        },
        error: () => this.loadingService.stopLoading('read', 'returnedRequest'),
      });
  }

  public getAcceptBeforeCancel($event: any, reuestId: number) {
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
    this.loadingService.startLoading('add', 'cancel');
    this._profileRepository
      .cancelReturnRequest({ id })
      .pipe(
        tap(() => this.loadingService.stopLoading('add', 'cancel')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => this._showSuccessMessage(),
        error: () => this.loadingService.stopLoading('add', 'cancel'),
      });
  }

  getStatusTitle(status: ReturnRequestStatusEnum): string {
    const statusObject = this.statusMap.find((item) => item.status === status);
    return statusObject ? statusObject.title : '';
  }

  onSelectStatus(selectedId: number) {
    this.selectedStatus = this.statusMap.find((x) => x.id === selectedId)!;
    this._getRequests();
  }

  pageChange($event: number) {
    this.page = $event;
    this._getRequests();
  }

  private _showSuccessMessage() {
    this._snackBar.showWarningSnackBar('درخواستش ما با موفقیت لغو گردید ');
    this._getRequests();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
