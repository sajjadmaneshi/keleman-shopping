import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { nationalCodeValidator } from '../../../../shared/validators/national-code.validator';
import { ProfileViewModel } from '../data/view-models/profile.view-model';
import { ProfileRepository } from '../data/profile.repository';
import { Subject, takeUntil, tap } from 'rxjs';
import { ProfileDto } from '../data/dto/profile.dto';
import { SnackBarService } from '../../../../shared/components/snack-bar/snack-bar.service';
import { InitialAppService } from '../../../../shared/services/initial-app.service';
import { LoadingService } from '../../../../../common/services/loading.service';

@Component({
  selector: 'keleman-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnDestroy, OnInit {
  personalInfoForm!: FormGroup;
  activeEditMainDetails = false;
  isFormSubmitted = false;
  destroy$ = new Subject<void>();
  phoneNumber!: string;
  personalInfo!: ProfileViewModel;

  public get firstName(): FormControl {
    return this.personalInfoForm.get('firstName') as FormControl;
  }

  public get lastName(): FormControl {
    return this.personalInfoForm.get('lastName') as FormControl;
  }

  public get nationalCode(): FormControl {
    return this.personalInfoForm.get('nationalCode') as FormControl;
  }
  public get email(): FormControl {
    return this.personalInfoForm.get('email') as FormControl;
  }

  constructor(
    private readonly _profileRepository: ProfileRepository,
    private readonly _snackBarService: SnackBarService,
    private readonly _initialAppService: InitialAppService,
    public readonly loadingService: LoadingService
  ) {
    this._initForm();
  }
  ngOnInit(): void {
    this._setFormData();
  }

  private _initForm() {
    this.personalInfoForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      nationalCode: new FormControl('', nationalCodeValidator()),
      email: new FormControl('', Validators.email),
    });
  }

  private _setFormData() {
    this._initialAppService.userSimpleInfo.subscribe((res) => {
      this.personalInfo = res;
      this.firstName.patchValue(res.firstName ?? '');
      this.lastName.patchValue(res.lastName ?? '');
      this.nationalCode.patchValue(res.nationalCode ?? '');
      this.email.patchValue(res.email ?? '');
      this.phoneNumber = res.phoneNumber ?? '';
    });
  }

  submitForm() {
    this.isFormSubmitted = true;
    if (this.personalInfoForm.valid) {
      this.loadingService.startLoading('add', 'submitPersonalInfo');

      const dto = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value || null,
        nationalCode: this.nationalCode.value || null,
      } as ProfileDto;

      this._profileRepository
        .completeProfile(dto)
        .pipe(
          tap(
            () => (
              this.loadingService.stopLoading('add', 'submitPersonalInfo'),
              (this.isFormSubmitted = false),
              (this.activeEditMainDetails = false)
            )
          ),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: () => this._handleSuccessRequest(dto),
          error: () =>
            this.loadingService.stopLoading('add', 'submitPersonalInfo'),
        });
    }
  }

  private _handleSuccessRequest(data: ProfileDto) {
    this._snackBarService.showPrimarySnackBar('اطلاعات شما با موفقت ثبت گردید');
    this._initialAppService.userSimpleInfo.next({
      ...this.personalInfo,
      ...data,
    } as ProfileViewModel);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
