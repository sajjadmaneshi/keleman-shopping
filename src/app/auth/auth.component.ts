import {
  Component,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AutoCompleteComponent } from '../shared/components/auto-complete/auto-complete.component';
import { NgOtpInputModule } from 'ng-otp-input';
import {
  CommonModule,
  isPlatformBrowser,
  NgOptimizedImage,
} from '@angular/common';
import { InputGroupComponent } from '../shared/components/input-group/input-group.component';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { LoadingProgressDirective } from '../shared/directives/loading-progress.directive';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';
import { ErrorFeedbackDirective } from '../shared/directives/error-feedback.directive';
import { NumberOnlyDirective } from '../shared/directives/number-only.directive';
import { LoginDto } from '../shared/services/auth/data/login.dto';
import { mobileNumberFormatValidator } from '../shared/validators/mobile-number.validator';
import { MatComponentsModule } from '../mat-components.module';
import { StatesViewModel } from '../shared/data/models/view-models/states.view-model';
import { CityViewModel } from '../shared/data/models/view-models/city.view-model';
import { HttpClientResult } from '../shared/data/models/http/http-client.result';
import { AccountRepository } from '../shared/services/auth/account.repository';
import { CompleteInfoDto } from '../shared/services/auth/data/complete-info.dto';
import { CustomPersianNumberService } from '../shared/services/persian-number.service';
import { TextOnlyDirective } from '../shared/directives/text-only.directive';
import { GeneralRepository } from '../shared/data/repositories/general.repository';
import { MatStepperModule } from '@angular/material/stepper';
import { LoadingService } from '../../common/services/loading.service';
import { BasketService } from '../layout/pages/checkout/services/basket.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
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
    MatStepperModule,
    NgOptimizedImage,
  ],
})
export class AuthComponent implements OnDestroy {
  selectedIndex$ = new BehaviorSubject<number | null>(null);
  @ViewChild('cd') private countDown!: CountdownComponent;
  private destroy$ = new Subject<void>();
  lastOtpLength = 0;
  selectedCity!: number;
  registerForm!: FormGroup;
  isFormSubmitted = false;
  isSendAgainActive = false;
  hasCompleteInfo!: boolean;
  verificationCodeValid = true;
  provinces: StatesViewModel[] = [];
  cities: CityViewModel[] = [];
  redirectUrl!: string;
  openAddCommentDialogFlag = false;

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
    private readonly _authservice: AuthService,
    private readonly _router: Router,
    private readonly _geoLocationRepository: GeneralRepository,
    private readonly _accountRepository: AccountRepository,
    private readonly _persianNumberSerive: CustomPersianNumberService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _basketService: BasketService,
    public readonly loadingService: LoadingService,
    @Inject(PLATFORM_ID) private _platformId: any
  ) {
    this._initForm();
    this._activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.redirectUrl = params['redirectUrl'];
        this.openAddCommentDialogFlag = params['openAddCommentDialog'] ?? false;
      });
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
      this.loadingService.startLoading('add', 'submit');

      let mobileNumber = this._persianNumberSerive.toEnglish(
        this.mobileFormControl.value!
      );
      this._authservice
        .sendVerificationCode(mobileNumber!)
        .then(() => {
          this.isSendAgainActive = false;
          this.isFormSubmitted = false;
          this._hasCompleteProfile();
          this.countDown.restart();
        })
        .finally(() => {
          this.loadingService.stopLoading('add', 'submit');
        });
    }
  }

  private _login() {
    if (this.otpVerificationCode.valid) {
      this.loadingService.startLoading('add', 'login');
      const loginDto: LoginDto = {
        mobile: this.mobileFormControl.value!,
        token: this.otpVerificationCode.value!,
      };
      this._authservice
        .login(loginDto)
        .then(() => this._handleSuccessLogin())
        .finally(() => {
          this.loadingService.stopLoading('add', 'login');
        });
    }
  }

  private _handleSuccessLogin(): void {
    const redirectTo = this.redirectUrl || '/';
    this._router.navigate([redirectTo], {
      queryParams: {
        openAddCommentDialog: this.openAddCommentDialogFlag,
      },
    });
    if (
      isPlatformBrowser(this._platformId) &&
      !localStorage.getItem('MERGED_BASKET')
    ) {
      this._basketService.mergeBasket();
    }
    this.openAddCommentDialogFlag = false;
    this._authservice.decodeJson();
  }

  public checkOtpValid($event: string) {
    if ($event.length !== this.lastOtpLength) {
      this.lastOtpLength = $event.length;
      if ($event.length === 5 && this.hasCompleteInfo) this._login();
    }
  }

  private _hasCompleteProfile(): void {
    this.loadingService.startLoading('read', 'hasCompleteProfile');
    this._authservice
      .hasCompleteProfile(this.mobileFormControl.value!)
      .then((result: boolean) => {
        this.hasCompleteInfo = result;
        this.changeTab(result ? 1 : 2);
        if (!result) this._getAllStates();
      })
      .finally(() => {
        this.loadingService.stopLoading('read', 'hasCompleteProfile');
      });
  }

  public notify($event: CountdownEvent) {
    if ($event.action === 'done') this.isSendAgainActive = true;
  }

  completeInfo() {
    this.isFormSubmitted = true;
    this.verificationCodeValid = this.otpVerificationCode.value?.length! === 5;
    if (this.registerForm.valid && this.verificationCodeValid) {
      this.loadingService.startLoading('update', 'completeInfo');
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
          tap(() => this.loadingService.stopLoading('update', 'completeInfo')),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (result) => {
            this._authservice.setAuthorizedInfoToLocalStorage({
              token: result.result.token,
              mobile: dto.mobile,
            });
            this._router.navigate(['/']);
          },
          error: () =>
            this.loadingService.stopLoading('update', 'completeInfo'),
        });
    }
  }

  public selectProvience($event: number) {
    if ($event) this._getCitiesOfState($event);
  }
  public selectCity($event: any) {
    this.selectedCity = $event;
  }

  changeTab(selectedTab: number) {
    this.selectedIndex$.next(selectedTab);
  }

  public changeNumber() {
    this.changeTab(0);
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
