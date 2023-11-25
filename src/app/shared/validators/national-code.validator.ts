import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function nationalCodeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (!Validators.required(control)) {
      if (
        value.length !== 10 ||
        !/^\d+$/.test(value) ||
        !isValidIranianNationalCode(value)
      ) {
        return { nationalCode: true };
      }
    }

    return null;
  };
}

// Helper function to check the validity of the Iranian National Code
function isValidIranianNationalCode(code: string): boolean {
  const check = parseInt(code[9]);

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(code[i]) * (10 - i);
  }

  const remainder = sum % 11;

  return (
    (remainder < 2 && check === remainder) ||
    (remainder >= 2 && check + remainder === 11)
  );
}
