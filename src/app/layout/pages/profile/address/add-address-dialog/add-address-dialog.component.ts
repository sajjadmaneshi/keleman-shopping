import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SearchResult } from 'leaflet-geosearch/lib/providers/provider';
import { RawResult } from 'leaflet-geosearch/lib/providers/openStreetMapProvider';

@Component({
  selector: 'keleman-add-address-dialog',
  templateUrl: './add-address-dialog.component.html',
  styleUrls: ['./add-address-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddAddressDialogComponent {
  showMap = true;
  addressForm!: FormGroup;
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

  constructor(private _dialogRef: MatDialogRef<AddAddressDialogComponent>) {
    this._initForm();
  }

  public get province(): FormControl {
    return this.addressForm.get('province') as FormControl;
  }
  public get city(): FormControl {
    return this.addressForm.get('city') as FormControl;
  }

  public get address(): FormControl {
    return this.addressForm.get('address') as FormControl;
  }

  public get postalCode(): FormControl {
    return this.addressForm.get('postalCode') as FormControl;
  }

  public get name(): FormControl {
    return this.postalCode.get('name') as FormControl;
  }

  private _initForm() {
    this.addressForm = new FormGroup({
      province: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      address: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
    });
  }

  close() {
    this._dialogRef.close();
  }

  onMapClick($event: SearchResult<RawResult>) {
    this.address.patchValue($event.label);
  }

  toggleShowMap() {
    this.showMap = !this.showMap;
  }
}
