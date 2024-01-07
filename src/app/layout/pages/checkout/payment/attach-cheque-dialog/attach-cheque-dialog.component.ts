import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChequeViewModel } from './cheque.view-model';
import { LoadingService } from '../../../../../../common/services/loading.service';
import { nationalCodeValidator } from '../../../../../shared/validators/national-code.validator';
import { PersianDateTimeService } from '../../../../../shared/services/date-time/persian-datetime.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentRepository } from '../../data/repositories/payment.repository';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'keleman-attach-cheque-dialog',
  templateUrl: './attach-cheque-dialog.component.html',
  styleUrls: ['./attach-cheque-dialog.component.scss'],
})
export class AttachChequeDialogComponent {
  chequeForm!: FormGroup;
  chequeList: ChequeViewModel[] = [];
  showForm = true;
  isFormSubmitted = false;
  destroy$ = new Subject<void>();

  public get bankName(): FormControl {
    return this.chequeForm.get('chequeDetails')?.get('bankName') as FormControl;
  }
  public get chequeId(): FormControl {
    return this.chequeForm.get('chequeDetails')?.get('chequeId') as FormControl;
  }
  public get date(): FormControl {
    return this.chequeForm.get('chequeDetails')?.get('date') as FormControl;
  }
  public get amount(): FormControl {
    return this.chequeForm.get('chequeDetails')?.get('amount') as FormControl;
  }

  public get fullName(): FormControl {
    return this.chequeForm
      .get('receiverDetails')
      ?.get('fullName') as FormControl;
  }

  public get nationalCode(): FormControl {
    return this.chequeForm
      .get('receiverDetails')
      ?.get('nationalCode') as FormControl;
  }

  constructor(
    private readonly _dialogRef: MatDialogRef<AttachChequeDialogComponent>,
    private readonly _paymentRepository: PaymentRepository,
    public readonly loadingService: LoadingService,
    public readonly persianDateTimeService: PersianDateTimeService,
    @Inject(MAT_DIALOG_DATA) private data: number
  ) {
    this._initForm();
  }

  private _initForm() {
    this.chequeForm = new FormGroup<any>({
      chequeDetails: new FormGroup({
        bankName: new FormControl('', Validators.required),
        chequeId: new FormControl('', [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ]),
        date: new FormControl('', Validators.required),
        amount: new FormControl('', Validators.required),
      }),
      receiverDetails: new FormGroup({
        fullName: new FormControl('', Validators.required),
        nationalCode: new FormControl('', [
          Validators.required,
          nationalCodeValidator(),
        ]),
      }),
    });
  }

  remove(chequeSerial: string) {
    const index = this.chequeList.findIndex((x) => x.serial === chequeSerial);
    if (index != -1) {
      this.chequeList.splice(index, 1);
      if (this.chequeList.length === 0) {
        this.showForm = true;
      }
    }
  }

  selectDate(date: any) {
    if (date) {
      this.date.patchValue(date);
    }
  }
  submitForm() {
    this.isFormSubmitted = true;
    if (this.chequeForm.valid) {
      this.loadingService.startLoading('add', 'cheque');
      const dto = {
        bankName: this.bankName.value,
        fullName: this.fullName.value,
        amount: this.amount.value,
        date: this.date.value,
        nationalCode: this.nationalCode.value,
        serial: this.chequeId.value,
      } as ChequeViewModel;
      this.chequeList.push(dto);
      this.loadingService.stopLoading('add', 'cheque');
      this.showForm = false;
      this.isFormSubmitted = false;
      this.chequeForm.reset();
    }
  }

  close() {
    this._dialogRef.close();
  }

  submitList() {
    this.loadingService.startLoading('add', 'attachCheque');
    this._paymentRepository
      .attachCheque(this.data, this.chequeList)
      .pipe(
        tap(() => this.loadingService.stopLoading('add', 'attachCheque')),
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        if (res.result) this._dialogRef.close(res.result);
      });
  }
}
