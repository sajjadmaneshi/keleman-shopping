import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  EmailValidator,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { nationalCodeValidator } from '../../../../shared/validators/national-code.validator';
import { ProfileViewModel } from '../data/view-models/profile.view-model';
import { ProfileRepository } from '../data/profile.repository';
import { Subject, takeUntil, tap } from 'rxjs';
import { HttpClientResult } from '../../../../shared/data/models/http/http-client.result';
import { ProfileDto } from '../data/dto/profile.dto';
import { ProfileService } from '../shared/profile.service';
import { SnackBarService } from '../../../../shared/components/snack-bar/snack-bar.service';
import { InitialAppService } from '../../../../shared/services/initial-app.service';

@Component({
  selector: 'keleman-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnDestroy, OnInit {
  personalInfoForm!: FormGroup;
  activeEditMainDetails = false;
  isFormSubmitted = false;

  isLoading = false;

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
    private readonly _initialAppService: InitialAppService
  ) {
    this._initForm();
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
      this.isLoading = true;
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
              (this.isLoading = false),
              (this.isFormSubmitted = false),
              (this.activeEditMainDetails = false)
            )
          ),
          takeUntil(this.destroy$)
        )
        .subscribe(
          () => this._handleSuccessRequest(dto),
          () => (this.isLoading = false)
        );
    }
  }

  private _handleSuccessRequest(data: ProfileDto) {
    this._snackBarService.showSuccessSnackBar('اطلاعات شما با موفقت ثبت گردید');
    this._initialAppService.userSimpleInfo.next({
      ...this.personalInfo,
      ...data,
    } as ProfileViewModel);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this._setFormData();
  }
}
