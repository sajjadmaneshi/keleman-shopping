import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'keleman-withdraw-request-dialog',
  templateUrl: './withdraw-request-dialog.component.html',
  styleUrls: ['./withdraw-request-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WithdrawRequestDialogComponent {
  withDrawForm!: FormGroup;
  formIsSubmitted = false;

  public get amount(): FormControl {
    return this.withDrawForm.get('amount') as FormControl;
  }

  public get description(): FormControl {
    return this.withDrawForm.get('description') as FormControl;
  }

  constructor(
    private _dialogRef: MatDialogRef<WithdrawRequestDialogComponent>
  ) {
    this._initForm();
  }

  private _initForm() {
    this.withDrawForm = new FormGroup<any>({
      amount: new FormControl(0, Validators.required),
      description: new FormControl(''),
    });
  }

  close() {
    this._dialogRef.close();
  }

  submitForm() {
    this.formIsSubmitted = true;
  }
}
