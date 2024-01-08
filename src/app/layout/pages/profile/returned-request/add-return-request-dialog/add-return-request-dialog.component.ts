import { Component, Inject, OnDestroy } from '@angular/core';
import { AutoCompleteComponent } from '../../../../../shared/components/auto-complete/auto-complete.component';
import { BidiModule } from '@angular/cdk/bidi';
import { KelemanMapComponent } from '../../../../../shared/components/keleman-map/keleman-map.component';
import { LoadingProgressDirective } from '../../../../../shared/directives/loading-progress.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmptyContentComponent } from '../../empty-content/empty-content.component';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ProductCanReturnComponent } from './order-can-return/product-can-return.component';
import { DatePickerComponent } from '../../../../../shared/components/date-picker/date-picker.component';
import { InputGroupComponent } from '../../../../../shared/components/input-group/input-group.component';
import { Subject, takeUntil, tap } from 'rxjs';
import { ProfileRepository } from '../../data/profile.repository';
import {
  OrderCanReturnViewModel,
  ReturnOrderProductViewModel,
} from '../../data/view-models/order-can-return.view-model';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ReturnProductComponent } from './return-order/return-product.component';
import { ReturnReasonViewModel } from '../../data/view-models/return-reason.view-model';
import { MatListModule } from '@angular/material/list';
import { ReturnRequestDto } from '../../data/dto/return-request.dto';
import { PersianDateTimeService } from '../../../../../shared/services/date-time/persian-datetime.service';
import { SnackBarService } from '../../../../../shared/components/snack-bar/snack-bar.service';
import { LoadingService } from '../../../../../../common/services/loading.service';

@Component({
  selector: 'keleman-add-return-request-dialog',
  standalone: true,
  imports: [
    AutoCompleteComponent,
    BidiModule,
    KelemanMapComponent,
    LoadingProgressDirective,
    MatCheckboxModule,
    MatDialogContent,
    MatIconModule,
    ReactiveFormsModule,
    EmptyContentComponent,
    NgForOf,
    NgIf,
    ProductCanReturnComponent,
    ReturnProductComponent,
    DatePickerComponent,
    InputGroupComponent,
    NgxSkeletonLoaderModule,
    MatDialogActions,
    MatDialogTitle,
    MatListModule,
    AsyncPipe,
  ],
  templateUrl: './add-return-request-dialog.component.html',
  styleUrl: './add-return-request-dialog.component.scss',
})
export class AddReturnRequestDialogComponent implements OnDestroy {
  returnProducts: ReturnOrderProductViewModel[] = [];
  returnReasons: ReturnReasonViewModel[] = [];
  destroy$ = new Subject<void>();
  selectedReasonId: number = -1;

  isFormSubmitted = false;
  returnOrderForm!: FormGroup;
  public get reason(): FormControl {
    return this.returnOrderForm.get('reason') as FormControl;
  }

  public get description(): FormControl {
    return this.returnOrderForm.get('description') as FormControl;
  }

  constructor(
    private readonly _profileRepository: ProfileRepository,
    private readonly _dialogRef: MatDialogRef<AddReturnRequestDialogComponent>,
    private _snackBarService: SnackBarService,
    public persianDateTimeService: PersianDateTimeService,
    public loadingService: LoadingService,

    @Inject(MAT_DIALOG_DATA) public data: OrderCanReturnViewModel
  ) {
    loadingService.startLoading('read', 'returnReasons');
    this.getReturnReasons();
    this._initForm();
  }

  private _initForm() {
    this.returnOrderForm = new FormGroup({
      reason: new FormControl(null, Validators.required),
      description: new FormControl(''),
    });
  }

  close() {
    this._dialogRef.close(true);
    this.destroy$.next();
    this.destroy$.complete();
    this.isFormSubmitted = false;
  }

  getReturnReasons() {
    this._profileRepository
      .getReturnReasons()
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'returnReasons')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => {
          this.returnReasons = [...result.result!];
        },
        error: () => this.loadingService.stopLoading('read', 'returnReasons'),
      });
  }

  addReturnProductList(returnProductItem: ReturnOrderProductViewModel) {
    if (returnProductItem) {
      if (this._isInList(returnProductItem.id)) {
        this._snackBarService.showWarningSnackBar(
          'این محصول قبلا به لیست اضافه شده است'
        );
        return;
      }
      this.returnProducts.push(
        JSON.parse(JSON.stringify({ ...returnProductItem, reasonId: -1 }))
      );
    }
  }

  selectReason(id: number) {
    this.selectedReasonId = id;
  }

  private _isInList(id: number) {
    return this.returnProducts.findIndex((x) => x.id === id) != -1;
  }

  removeFromReturnList(productId: number) {
    const index = this.returnProducts.findIndex((x) => x.id == productId);
    if (index != -1) this.returnProducts.splice(index, 1);
  }

  sumbitForm() {
    this.isFormSubmitted = true;
    if (this.returnProducts.length > 0 && this.returnOrderForm.valid) {
      this.loadingService.startLoading('add', 'submitReturnRequest');
      const dto = {
        billId: this.data.id,
        description: this.description.value,
        selectedReasonId: this.selectedReasonId,
        products: this.returnProducts.map((x) => {
          return { amount: x.amount, productId: x.id };
        }),
      } as ReturnRequestDto;

      this._profileRepository
        .addReturnRequest(dto)
        .pipe(
          tap(() =>
            this.loadingService.stopLoading('add', 'submitReturnRequest')
          ),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: () => {
            this._snackBarService.showPrimarySnackBar(
              'درخواست شما با موفقیت ثبت گردید'
            );
            this.close();
          },
          error: () =>
            this.loadingService.stopLoading('add', 'submitReturnRequest'),
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
