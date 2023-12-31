import { Component, Input, OnDestroy } from '@angular/core';
import { AuthService } from '../../../../../shared/services/auth/auth.service';
import { InitialAppService } from '../../../../../shared/services/initial-app.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { ProfileViewModel } from '../../../../pages/profile/data/view-models/profile.view-model';
import { UserCreditViewModel } from '../../../../pages/profile/data/view-models/user-credit.view-model';
import { combineLatest } from 'rxjs';
import { LoadingService } from '../../../../../../common/services/loading.service';

@Component({
  selector: 'keleman-top-menu',
  templateUrl: './top-menu.component.html',
})
export class TopMenuComponent implements OnDestroy {
  isLoggedIn = false;
  userProfileInfo!: ProfileViewModel;
  userCreditInfo!: UserCreditViewModel;

  destroy$ = new Subject<void>();
  @Input() basketCount = 0;

  constructor(
    private readonly _authService: AuthService,
    public readonly userService: InitialAppService,
    public readonly loadingService: LoadingService
  ) {
    this._getInitialDate();
  }

  private _getInitialDate() {
    this.loadingService.startLoading('read', 'profileInfo');
    this.loadingService.startLoading('read', 'userCredit');
    this._authService.isAuthenticated.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.userService.userCredit
          .pipe(
            tap(() => this.loadingService.stopLoading('read', 'userCredit')),
            takeUntil(this.destroy$)
          )
          .subscribe((credit) => (this.userCreditInfo = credit));
        this.userService.userSimpleInfo
          .pipe(
            tap(() => this.loadingService.stopLoading('read', 'profileInfo')),
            takeUntil(this.destroy$)
          )
          .subscribe({
            next: (userInfo) => {
              this.userProfileInfo = userInfo;
            },
            error: () => this.loadingService.stopLoading('read', 'profileInfo'),
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
