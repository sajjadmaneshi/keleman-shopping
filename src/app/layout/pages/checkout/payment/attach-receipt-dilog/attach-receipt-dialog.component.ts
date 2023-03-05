import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'keleman-attach-receipt-dialog',
  templateUrl: './attach-receipt-dialog.component.html',
  styleUrls: ['./attach-receipt-dialog.component.scss'],
})
export class AttachReceiptDialogComponent {
  receiptForms: FormGroup[] = [
    new FormGroup({
      receipts: new FormArray([
        new FormControl('', Validators.required),
        new FormControl(),
        new FormControl(),
        new FormControl(),
      ]),
    }),
  ];

  addNewReceipt() {
    this.receiptForms.push(
      new FormGroup({
        receipts: new FormArray([
          new FormControl(),
          new FormControl(),
          new FormControl(),
          new FormControl(),
        ]),
      })
    );
  }

  removeReceiptForm(index: number) {
    this.receiptForms.splice(index, 1);
  }

  validate() {}
}
