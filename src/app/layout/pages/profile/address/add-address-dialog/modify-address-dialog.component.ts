import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SearchResult } from 'leaflet-geosearch/lib/providers/provider';
import { RawResult } from 'leaflet-geosearch/lib/providers/openStreetMapProvider';
import { GeneralRepository } from '../../../../../shared/data/repositories/general.repository';
import { Subject, takeUntil, tap } from 'rxjs';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { StatesViewModel } from '../../../../../shared/data/models/view-models/states.view-model';
import { CityViewModel } from '../../../../../shared/data/models/view-models/city.view-model';
import { mobileNumberFormatValidator } from '../../../../../shared/validators/mobile-number.validator';
import { AddressDto } from '../../data/dto/address.dto';
import { ProfileRepository } from '../../data/profile.repository';
import { UserAddressViewModel } from '../../data/view-models/user-address.view-model';

@Component({
  selector: 'keleman-modify-address-dialog',
  templateUrl: './modify-address-dialog.component.html',
  styleUrls: ['./modify-address-dialog.component.scss'],
})
export class ModifyAddressDialogComponent {
  editMode = false;
  isFormSubmitted = false;
  showMap = true;
  addressForm!: FormGroup;
  private destroy$ = new Subject<void>();
  provinces: StatesViewModel[] = [];
  cities: CityViewModel[] = [];
  stateLoading = false;
  cityLoading = false;

  submitLoading = false;

  location!: { lat: number; lng: number };
  selectedCityId!: number;

  constructor(
    private _dialogRef: MatDialogRef<ModifyAddressDialogComponent>,
    private _geoLocationRepository: GeneralRepository,
    private _profileRepository: ProfileRepository,
    @Inject(MAT_DIALOG_DATA) private data: UserAddressViewModel | undefined
  ) {
    this._initForm();
    this._getAllStates();
    if (this.data) {
      this.editMode = true;
      this._setFormData();
    }
  }

  private _setFormData() {
    this.addressForm.patchValue({
      address: this.data?.addressText,
      postalCode: this.data?.postalCode,
      reciverName: this.data?.receiverName,
      reciverPhone: this.data?.receiverPhone,
      city: this.data?.city.title,
      province: this.data?.city.province.title,
    });
    this.selectedCityId = this.data?.city.id!;
    this._getCitiesOfState(this.data?.city.province.id!);
    this.location = { lat: this.data?.latitude!, lng: this.data?.longitude! };
  }

  private _getAllStates() {
    this.stateLoading = true;
    this.province.disable();
    this._geoLocationRepository
      .getAllStates()
      .pipe(
        tap(() => (this.stateLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe((result: HttpClientResult<StatesViewModel[]>) => {
        this.provinces = result.result as StatesViewModel[];
        this.province.enable();
      });
  }

  public selectProvience($event: number) {
    if ($event) this._getCitiesOfState($event);
  }
  private _getCitiesOfState(provienceID: number) {
    this.cityLoading = true;
    this.city.disable();
    this._geoLocationRepository
      .getCitiesOfState(provienceID)
      .pipe(
        tap(() => (this.cityLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe((result: HttpClientResult<CityViewModel[]>) => {
        this.cities = result.result as CityViewModel[];
        this.city.enable();
      });
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

  public get reciverName(): FormControl {
    return this.addressForm.get('reciverName') as FormControl;
  }
  public get reciverPhone(): FormControl {
    return this.addressForm.get('reciverPhone') as FormControl;
  }

  private _initForm() {
    this.addressForm = new FormGroup({
      province: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      address: new FormControl('', Validators.required),
      postalCode: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
      ]),
      reciverName: new FormControl('', Validators.required),
      reciverPhone: new FormControl('', [
        Validators.required,
        mobileNumberFormatValidator(),
        Validators.maxLength(11),
        Validators.minLength(11),
      ]),
    });
  }
  onCitySelect(cityId: number) {
    this.selectedCityId = cityId;
  }
  sumbitForm() {
    this.isFormSubmitted = true;
    if (this.addressForm.valid) {
      this.submitLoading = true;
      const dto = {
        addressText: this.address.value,
        postalCode: this.postalCode.value.toString(),
        cityId: this.selectedCityId,
        longitude: this.location.lng,
        latitude: this.location.lat,
        receiverName: this.reciverName.value,
        receiverPhone: this.reciverPhone.value,
      } as AddressDto;

      this.editMode ? this._editSpecific(dto) : this._addNew(dto);
    }
  }

  private _addNew(dto: AddressDto) {
    this._profileRepository
      .addNewAddress(dto)
      .pipe(
        tap(() => (this.submitLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        () => {
          this.close();
        },
        () => (this.submitLoading = false)
      );
  }

  private _editSpecific(dto: AddressDto) {
    this._profileRepository
      .updateAddress(this.data?.id!, dto)
      .pipe(
        tap(() => (this.submitLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        () => {
          this.close();
        },
        () => (this.submitLoading = false)
      );
  }

  close() {
    this._dialogRef.close(true);
    this.isFormSubmitted = false;
  }

  onMapClick($event: SearchResult<RawResult>) {
    this.location = { lat: $event.y, lng: $event.x };
    this.address.patchValue($event.label);
  }

  toggleShowMap() {
    this.showMap = !this.showMap;
  }
}
