import { Component, Inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChequeViewModel } from './cheque.view-model';
import { LoadingService } from '../../../../../../common/services/loading.service';
import { nationalCodeValidator } from '../../../../../shared/validators/national-code.validator';
import { PersianDateTimeService } from '../../../../../shared/services/date-time/persian-datetime.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentRepository } from '../../data/repositories/payment.repository';
import { Subject, takeUntil, tap } from 'rxjs';
import { SelectedFiles } from '../../../../../shared/components/dropzone/dropzone.component';

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

  frontImageUrl: string | null = null;
  backImageUrl: string | null = null;

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

  uploadFile(files: SelectedFiles, isFront: boolean = true) {
    if (files) {
      if (files.addedFiles.length > 0) {
        this.loadingService.startLoading(
          'add',
          isFront ? 'uploadFront' : 'uploadBack'
        );
        const formData = new FormData();
        formData.append('file', files.addedFiles[0], files.addedFiles[0].name);
        this._paymentRepository
          .uploadFile(this.data, formData)
          .pipe(
            tap(() =>
              this.loadingService.stopLoading(
                'add',
                isFront ? 'uploadFront' : 'uploadBack'
              )
            ),
            takeUntil(this.destroy$)
          )
          .subscribe({
            next: (result) => {
              isFront
                ? (this.frontImageUrl = result)
                : (this.backImageUrl = result);
            },
            error: () =>
              this.loadingService.stopLoading(
                'add',
                isFront ? 'uploadFront' : 'uploadBack'
              ),
          });
      }
    }
  }
  removeFrontImage() {
    this.frontImageUrl = '';
  }
  removeBackImage() {
    this.backImageUrl = '';
  }
  selectDate(date: any) {
    if (date) {
      this.date.patchValue(date);
    }
  }
  submitForm() {
    this.isFormSubmitted = true;
    if (this.chequeForm.valid && this.frontImageUrl && this.backImageUrl) {
      this.loadingService.startLoading('add', 'cheque');
      const dto = {
        bankName: this.bankName.value,
        fullName: this.fullName.value,
        amount: this.amount.value,
        date: this.date.value,
        nationalCode: this.nationalCode.value,
        serial: this.chequeId.value,
        backImage: this.backImageUrl,
        frontImage: this.frontImageUrl,
      } as ChequeViewModel;
      this.chequeList.push(dto);
      this.loadingService.stopLoading('add', 'cheque');
      this.showForm = false;
      this.isFormSubmitted = false;
      this.chequeForm.reset();
      this.frontImageUrl = null;
      this.backImageUrl = null;
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
      .subscribe({
        next: (res) => {
          if (res) this._dialogRef.close(this.date);
        },
        error: () => this.loadingService.stopLoading('add', 'attachCheque'),
      });
  }
}
