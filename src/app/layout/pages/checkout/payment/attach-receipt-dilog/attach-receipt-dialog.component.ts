import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFormModel } from './receipt-form/base-form.model';

@Component({
  selector: 'keleman-attach-receipt-dialog',
  templateUrl: './attach-receipt-dialog.component.html',
  styleUrls: ['./attach-receipt-dialog.component.scss'],
})
export class AttachReceiptDialogComponent {
  newBaseForm = new FormGroup({
    receipts: new FormArray([
      new FormControl('', Validators.required),
      new FormControl('', Validators.required),
      new FormControl(null, Validators.required),
      new FormControl('', Validators.required),
    ]),
  });

  receiptForms: BaseFormModel[] = [
    { form: this.newBaseForm, isSubmitted: false },
  ];
  addNewReceipt() {
    this.receiptForms.push({ form: this.newBaseForm, isSubmitted: false });
  }

  removeReceiptForm(index: number) {
    this.receiptForms.splice(index, 1);
  }

  validate() {
    this.receiptForms.forEach((forms: BaseFormModel, index: number) => {
      forms.isSubmitted = true;
      if (forms.form.valid) {
        console.log(`form${index} is valid`);
      }
    });
  }
}
