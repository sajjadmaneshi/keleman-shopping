import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'keleman-attach-cheque-dialog',
  templateUrl: './attach-cheque-dialog.component.html',
  styleUrls: ['./attach-cheque-dialog.component.scss'],
})
export class AttachChequeDialogComponent {
  chequeForm!: FormGroup;
  showForm = false;

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

  constructor() {
    this._initForm();
  }

  private _initForm() {
    this.chequeForm = new FormGroup<any>({
      chequeDetails: new FormGroup({
        bankName: new FormControl('', Validators.required),
        chequeId: new FormControl('', [
          Validators.required,
          Validators.min(16),
          Validators.max(16),
        ]),
        date: new FormControl('', Validators.required),
        amount: new FormControl('', Validators.required),
      }),
      receiverDetails: new FormGroup({
        fullName: new FormControl('', Validators.required),
        nationalCode: new FormControl('', Validators.required),
      }),
    });
  }

  selectDate($event: string) {
    console.log($event);
  }
}
