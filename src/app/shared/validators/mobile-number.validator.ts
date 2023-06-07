import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function mobileNumberFormatValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const mobileNumber = control.value;

    const pattern = /^0[0-9]\d{9}$/;

    if (
      !Validators.required(control) &&
      mobileNumber &&
      !pattern.test(mobileNumber)
    ) {
      return { mobileNumberFormat: true };
    }

    return null;
  };
}
