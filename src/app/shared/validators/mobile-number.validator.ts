import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { CustomPersianNumberService } from '../../shared/services/persian-number.service';

const persianNumberService = new CustomPersianNumberService();
export function mobileNumberFormatValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const mobileNumber = persianNumberService.toEnglish(control.value);

    const pattern =
      /^(0)?([ ]|-|[()]){0,2}9[0-9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}$/;

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
