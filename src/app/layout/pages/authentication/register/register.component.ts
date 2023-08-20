import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutoCompleteComponent } from '../../../../shared/components/auto-complete/auto-complete.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { CommonModule } from '@angular/common';
import { InputGroupComponent } from '../../../../shared/components/input-group/input-group.component';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { LoadingProgressDirective } from '../../../../shared/directives/loading-progress.directive';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { ErrorFeedbackDirective } from '../../../../shared/directives/error-feedback.directive';
import { NumberOnlyDirective } from '../../../../shared/directives/number-only.directive';
import { LoginDto } from '../../../../shared/services/auth/data/login.dto';
import { mobileNumberFormatValidator } from '../../../../shared/validators/mobile-number.validator';
import { MatComponentsModule } from '../../../../mat-components.module';
import { StatesViewModel } from '../../../../shared/data/models/view-models/states.view-model';
import { CityViewModel } from '../../../../shared/data/models/view-models/city.view-model';

import { HttpClientResult } from '../../../../shared/data/models/http/http-client.result';
import { AccountRepository } from '../../../../shared/services/auth/account.repository';
import { CompleteInfoDto } from '../../../../shared/services/auth/data/complete-info.dto';
import { RegisterStatusEnum } from './register-status.enum';
import { CustomPersianNumberService } from '../../../../shared/services/persian-number.service';
import { TextOnlyDirective } from '../../../../shared/directives/text-only.directive';
import { GeneralRepository } from '../../../../shared/data/repositories/general.repository';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    AutoCompleteComponent,
    NgOtpInputModule,
    ReactiveFormsModule,
    InputGroupComponent,
    CountdownComponent,
    LoadingProgressDirective,
    RouterLink,
    ErrorFeedbackDirective,
    NumberOnlyDirective,
    MatComponentsModule,
    TextOnlyDirective,
  ],
})
export class RegisterComponent implements OnDestroy {
  @ViewChild('cd') private countDown!: CountdownComponent;
  private destroy$ = new Subject<void>();
  registerStatusEnum = RegisterStatusEnum;
  lastOtpLength = 0;
  verificationCodeSent: boolean = false;
  selectedCity!: number;
  registerForm!: FormGroup;
  isFormSubmitted = false;
  submitLoading = false;
  stateLoading = false;
  cityLoading = false;
  isSendAgainActive = false;
  hasCompleteInfo!: boolean;
  verificationCodeValid = true;
  provinces: StatesViewModel[] = [];
  cities: CityViewModel[] = [];

  public get name(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }

  public get family(): FormControl {
    return this.registerForm.get('family') as FormControl;
  }

  public get province(): FormControl {
    return this.registerForm.get('province') as FormControl;
  }
  public get city(): FormControl {
    return this.registerForm.get('city') as FormControl;
  }

  mobileFormControl = new FormControl('', [
    Validators.required,
    mobileNumberFormatValidator(),
    Validators.maxLength(11),
    Validators.minLength(11),
  ]);
  otpVerificationCode = new FormControl<string>('', [
    Validators.required,
    Validators.maxLength(5),
  ]);

  constructor(
    private _authservice: AuthService,
    private _router: Router,
    private _geoLocationRepository: GeneralRepository,
    private _accountRepository: AccountRepository,
    private _persianNumberSerive: CustomPersianNumberService
  ) {
    this._initForm();
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

  private _initForm() {
    this.registerForm = new FormGroup<any>({
      name: new FormControl('', Validators.required),
      family: new FormControl('', Validators.required),
      province: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
    });
  }

  sendVerificationCode() {
    this.isFormSubmitted = true;
    if (this.mobileFormControl.valid) {
      let mobileNumber = this._persianNumberSerive.toEnglish(
        this.mobileFormControl.value!
      );
      this.submitLoading = true;
      this._authservice
        .sendVerificationCode(mobileNumber!)
        .then(() => {
          this.verificationCodeSent = true;
          this.isSendAgainActive = false;
          this.isFormSubmitted = false;
          this._hasCompleteProfile();
          this.countDown.restart();
        })
        .finally(() => (this.submitLoading = false));
    }
  }

  private _login() {
    if (this.otpVerificationCode.valid) {
      this.submitLoading = true;
      const loginDto: LoginDto = {
        mobile: this.mobileFormControl.value!,
        token: this.otpVerificationCode.value!,
      };
      this._authservice
        .login(loginDto)
        .then(() => {
          this._router.navigate(['/']);
          this._authservice.decodeJson();
        })
        .finally(() => (this.submitLoading = false));
    }
  }

  CheckOtpValid($event: string) {
    if ($event.length !== this.lastOtpLength) {
      this.lastOtpLength = $event.length;
      if ($event.length === 5 && this.hasCompleteInfo) this._login();
    }
  }

  private _hasCompleteProfile(): void {
    this.submitLoading = true;
    this._authservice
      .hasCompleteProfile(this.mobileFormControl.value!)
      .then((result: boolean) => {
        this.hasCompleteInfo = result;
        if (!result) this._getAllStates();
      })
      .finally(() => (this.submitLoading = false));
  }

  notify($event: CountdownEvent) {
    if ($event.action === 'done') this.isSendAgainActive = true;
  }

  completeInfo() {
    this.isFormSubmitted = true;
    this.verificationCodeValid = this.otpVerificationCode.value?.length! === 5;
    if (this.registerForm.valid && this.verificationCodeValid) {
      this.submitLoading = true;
      const dto = {
        mobile: this.mobileFormControl.value,
        firstName: this.name.value,
        lastName: this.family.value,
        token: Number(this.otpVerificationCode.value),
        locationId: this.selectedCity,
      } as CompleteInfoDto;
      this._accountRepository
        .completeInfo(dto)
        .pipe(
          tap(() => (this.submitLoading = false)),
          takeUntil(this.destroy$)
        )
        .subscribe((result) => {
          this._authservice.setAuthorizedInfoToLocalStorage({
            token: result.result.token,
            mobile: dto.mobile,
          });
          this._router.navigate(['/']);
        });
    }
  }

  selectProvience($event: number) {
    if ($event) this._getCitiesOfState($event);
  }
  selectCity($event: any) {
    this.selectedCity = $event;
  }

  getRegisterStatus(): RegisterStatusEnum {
    if (!this.verificationCodeSent) return RegisterStatusEnum.otpNotSent;
    if (this.verificationCodeSent && this.hasCompleteInfo === true)
      return RegisterStatusEnum.otpSent;
    if (this.verificationCodeSent && this.hasCompleteInfo === false)
      return RegisterStatusEnum.completeInfo;
    else return RegisterStatusEnum.otpNotSent;
  }

  changeNumber() {
    this.verificationCodeSent = false;
    this.verificationCodeValid = true;
    this.otpVerificationCode.reset();
    this.registerForm.reset();
    this.otpVerificationCode.updateValueAndValidity();
    this.registerForm.updateValueAndValidity();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
