import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../../../shared/services/auth/auth.service';
import { InitialAppService } from '../../../../../shared/services/initial-app.service';
import { Subject, Subscription, takeUntil, tap } from 'rxjs';
import { ProfileViewModel } from '../../../../pages/profile/data/view-models/profile.view-model';
import { UserCreditViewModel } from '../../../../pages/profile/data/view-models/user-credit.view-model';
import { combineLatest } from 'rxjs';
import { GuestBasketService } from '../../../../pages/checkout/guest-basket.service';

@Component({
  selector: 'keleman-top-menu',
  templateUrl: './top-menu.component.html',
})
export class TopMenuComponent implements OnDestroy {
  isLoggedIn = false;
  isLoading = true;
  profileInfoLoading = true;
  userProfileInfo!: ProfileViewModel;
  userCreditInfo!: UserCreditViewModel;

  destroy$ = new Subject<void>();
  @Input() basketCount = 0;

  constructor(
    private _authService: AuthService,
    public userService: InitialAppService,
    private _basketService: GuestBasketService
  ) {
    this._getInitialDate();
  }

  private _getInitialDate() {
    combineLatest(
      this._authService.isAuthenticated,
      this.userService.userCredit
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(([isLoggedIn, userCredit]) => {
        this.isLoggedIn = isLoggedIn;
        this.userCreditInfo = userCredit;
        this.isLoading = false;
      });

    this.userService.userSimpleInfo
      .pipe(
        tap(() => (this.profileInfoLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe((userInfo) => {
        this.userProfileInfo = userInfo;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
