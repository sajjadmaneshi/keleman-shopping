import { Component, Inject, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormModel } from './receipt-form/base-form.model';
import { LoadingService } from '../../../../../../common/services/loading.service';
import { AttachReceiptDto } from '../../data/dto/attach-receipt.dto';
import { PaymentRepository } from '../../data/repositories/payment.repository';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'keleman-attach-receipt-dialog',
  templateUrl: './attach-receipt-dialog.component.html',
  styleUrls: ['./attach-receipt-dialog.component.scss'],
})
export class AttachReceiptDialogComponent implements OnDestroy {
  destroy$ = new Subject<void>();
  constructor(
    public loadingService: LoadingService,
    private readonly _paymentRepositoy: PaymentRepository,
    private readonly _dialogRef: MatDialogRef<AttachReceiptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: number
  ) {}

  receiptForms: BaseFormModel[] = [
    {
      form: new FormGroup({
        receipts: new FormArray([
          new FormControl('', Validators.required),
          new FormControl('', Validators.required),
          new FormControl('', Validators.required),
          new FormControl('', Validators.required),
        ]),
      }),
      isSubmitted: false,
    },
  ];

  receipts: AttachReceiptDto[] = [];
  addNewReceipt() {
    this.receiptForms.push({
      form: new FormGroup({
        receipts: new FormArray([
          new FormControl('', Validators.required),
          new FormControl('', Validators.required),
          new FormControl(null, Validators.required),
          new FormControl('', Validators.required),
        ]),
      }),
      isSubmitted: false,
    });
  }

  removeReceiptForm(index: number) {
    this.receiptForms.splice(index, 1);
  }

  validate() {
    let allFormsValid = true;
    this.receipts = [];
    this.receiptForms.forEach((formModel: BaseFormModel) => {
      formModel.isSubmitted = true;
      if (formModel.form.valid) {
        this.addToReceipt(formModel.form);
      } else {
        allFormsValid = false;
        return;
      }
    });
    if (allFormsValid) {
      this.loadingService.startLoading('add', 'attachReceipt');
      this._paymentRepositoy
        .attachRecipt(this.data, this.receipts)
        .pipe(
          tap(() => this.loadingService.stopLoading('add', 'attachReceipt'))
        )
        .subscribe({
          next: (result) => {
            if (result) this._dialogRef.close(this.data);
          },
          error: () => this.loadingService.stopLoading('add', 'attachReceipt'),
        });
    }
  }
  addToReceipt(form: FormGroup) {
    this.receipts.push({
      amount: (form.get('receipts') as FormArray).controls[0].value,

      sourceBank: (form.get('receipts') as FormArray).controls[1].value,
      destinationBank: (form.get('receipts') as FormArray).controls[2].value,
      bankReferenceId: +(form.get('receipts') as FormArray).controls[3].value,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
