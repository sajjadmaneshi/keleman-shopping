import { Component } from '@angular/core';
import { map, Observable, startWith, timer } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isVisible = false;
  registerForm!: FormGroup;
  filteredStates: Observable<any[]>;
  provinces: any[] = [
    { id: 1, name: 'شیراز' },
    { id: 2, name: 'تهران' },
    { id: 3, name: 'اصفهان' },
    { id: 4, name: 'گیلان' },
    { id: 5, name: 'یزد' },
    { id: 6, name: 'کرمان' },
    { id: 7, name: 'خراسان رضوی' },
    { id: 8, name: 'هرمزگان' },
    { id: 9, name: 'کرمانشاه' },
    { id: 10, name: 'همدان' },
  ];

  public get province(): FormControl {
    return this.registerForm.get('province') as FormControl;
  }
  public get city(): FormControl {
    return this.registerForm.get('city') as FormControl;
  }
  constructor() {
    this._initForm();
    this.filteredStates = this.province.valueChanges.pipe(
      startWith(''),
      map((state) =>
        state ? this._filterStates(state) : this.provinces.slice()
      )
    );
  }
  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.provinces.filter((state) =>
      state.name.toLowerCase().includes(filterValue)
    );
  }

  changePasswordVisibility() {
    this.isVisible = !this.isVisible;
  }

  private _initForm() {
    this.registerForm = new FormGroup<any>({
      province: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
    });
  }
}
