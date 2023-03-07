import { FormGroup } from '@angular/forms';

export interface BaseFormModel {
  form: FormGroup;
  isSubmitted: boolean;
}
