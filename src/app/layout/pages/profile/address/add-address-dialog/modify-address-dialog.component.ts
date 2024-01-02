import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Subject, takeUntil, tap } from 'rxjs';
import { SearchResult } from 'leaflet-geosearch/lib/providers/provider';
import { RawResult } from 'leaflet-geosearch/lib/providers/openStreetMapProvider';
import { GeneralRepository } from '../../../../../shared/data/repositories/general.repository';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { StatesViewModel } from '../../../../../shared/data/models/view-models/states.view-model';
import { CityViewModel } from '../../../../../shared/data/models/view-models/city.view-model';
import { mobileNumberFormatValidator } from '../../../../../shared/validators/mobile-number.validator';
import { AddressDto } from '../../data/dto/address.dto';
import { ProfileRepository } from '../../data/profile.repository';
import { InitialAppService } from '../../../../../shared/services/initial-app.service';
import { ProfileViewModel } from '../../data/view-models/profile.view-model';
import { UserAddressViewModel } from '../../data/view-models/user-address.view-model';
import { LoadingService } from '../../../../../../common/services/loading.service';

@Component({
  selector: 'keleman-modify-address-dialog',
  templateUrl: './modify-address-dialog.component.html',
  styleUrls: ['./modify-address-dialog.component.scss'],
})
export class ModifyAddressDialogComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  editMode = false;
  isFormSubmitted = false;
  showMap = true;
  addressForm!: FormGroup;
  provinces: StatesViewModel[] = [];
  cities: CityViewModel[] = [];
  location!: { lat: number; lng: number };
  selectedCityId!: number;
  iAmReciver = false;
  userBaseInfo!: ProfileViewModel;

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

  constructor(
    private readonly _dialogRef: MatDialogRef<ModifyAddressDialogComponent>,
    private readonly _geoLocationRepository: GeneralRepository,
    private readonly _profileRepository: ProfileRepository,
    private readonly _initialAppService: InitialAppService,
    @Inject(MAT_DIALOG_DATA)
    private readonly data: UserAddressViewModel | undefined,
    public loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.editMode = !!this.data;
    this._initForm();
    this._getAllStates();

    if (this.editMode) this._setFormData();

    this._initialAppService.userSimpleInfo
      .pipe(takeUntil(this.destroy$))
      .subscribe((baseInfo) => {
        this.userBaseInfo = baseInfo;
      });
  }

  private _setFormData() {
    const formData = {
      address: this.data?.addressText,
      postalCode: this.data?.postalCode,
      reciverName: this.data?.receiverName,
      reciverPhone: this.data?.receiverPhone,
      city: this.data?.city.title,
      province: this.data?.city.province.title,
    };
    this.addressForm.setValue(formData);
    this.selectedCityId = this.data?.city.id!;
    this.iAmReciver = this.data?.iamReceiver!;
    this._getCitiesOfState(this.data?.city.province.id!);
    this.location = { lat: this.data?.latitude!, lng: this.data?.longitude! };
  }

  private _getAllStates() {
    this.loadingService.startLoading('read', 'states');

    this.province.disable();
    this._geoLocationRepository
      .getAllStates()
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'states')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result: HttpClientResult<StatesViewModel[]>) => {
          this.provinces = result.result as StatesViewModel[];
          this.province.enable();
        },
        error: () => this.loadingService.stopLoading('read', 'states'),
      });
  }

  public selectProvience($event: number) {
    if ($event) this._getCitiesOfState($event);
  }
  private _getCitiesOfState(provienceID: number) {
    this.loadingService.startLoading('read', 'cities');
    this.city.disable();
    this._geoLocationRepository
      .getCitiesOfState(provienceID)
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'cities')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result: HttpClientResult<CityViewModel[]>) => {
          this.cities = result.result as CityViewModel[];
          this.city.enable();
        },
        error: () => this.loadingService.stopLoading('read', 'cities'),
      });
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
      this.loadingService.startLoading('add', 'submitAddress');
      const dto = {
        addressText: this.address.value,
        postalCode: this.postalCode.value.toString(),
        cityId: this.selectedCityId,
        longitude: this.location.lng,
        latitude: this.location.lat,
        receiverName: this.reciverName.value,
        receiverPhone: this.reciverPhone.value,
        iamReceiver: this.iAmReciver,
      } as AddressDto;

      this.editMode ? this._editSpecific(dto) : this._addNew(dto);
    }
  }

  private _addNew(dto: AddressDto) {
    this._profileRepository
      .addNewAddress(dto)
      .pipe(
        tap(() => this.loadingService.stopLoading('add', 'submitAddress')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => this.close(),
        error: () => this.loadingService.stopLoading('add', 'submitAddress'),
      });
  }

  private _editSpecific(dto: AddressDto) {
    this._profileRepository
      .updateAddress(this.data?.id!, dto)
      .pipe(
        tap(() => this.loadingService.stopLoading('add', 'submitAddress')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => this.close(),
        error: () => this.loadingService.stopLoading('add', 'submitAddress'),
      });
  }

  changeCheckBox($event: MatCheckboxChange) {
    this.iAmReciver = $event.checked;
    if (this.iAmReciver) this.setReciverNameAndMobileForMe();
    else {
      this.reciverName.reset();
      this.reciverPhone.reset();
    }
  }
  setReciverNameAndMobileForMe() {
    this.reciverName.patchValue(
      `${this.userBaseInfo.firstName} ${this.userBaseInfo.lastName}`
    );
    this.reciverPhone.patchValue(this.userBaseInfo.phoneNumber);
  }

  close() {
    this._dialogRef.close(true);
    this.isFormSubmitted = false;
  }

  onMapClick($event: SearchResult<RawResult>) {
    this.location = { lat: $event.y, lng: $event.x };
    if (!this.editMode) this.address.patchValue($event.label);
  }

  toggleShowMap() {
    this.showMap = !this.showMap;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
