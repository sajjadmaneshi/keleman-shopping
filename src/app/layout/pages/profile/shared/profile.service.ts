import { Injectable, OnDestroy } from '@angular/core';
import { ProfileRepository } from '../data/profile.repository';
import { ProfileViewModel } from '../data/view-models/profile.view-model';
import { Subject, takeUntil, tap } from 'rxjs';
import { UserCreditViewModel } from '../data/view-models/user-credit.view-model';
import { LoadingService } from '../../../../../common/services/loading.service';

@Injectable({ providedIn: 'root' })
export class ProfileService implements OnDestroy {
  personalInfo = new Subject<ProfileViewModel>();
  destroy$ = new Subject<void>();
  constructor(
    private readonly _profileRepository: ProfileRepository,
    private readonly _loadingService: LoadingService
  ) {}

  public getPersonalInfo(): Promise<ProfileViewModel | undefined> {
    this._loadingService.startLoading('read', 'profile');
    return new Promise<ProfileViewModel | undefined>((resolve, reject) => {
      this._profileRepository
        .getProfile()
        .pipe(
          tap(() => this._loadingService.stopLoading('read', 'profile')),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (result) => resolve(result.result!),
          error: () => {
            this._loadingService.stopLoading('read', 'profile');
            reject(undefined);
          },
        });
    });
  }

  public getUserAccount(): Promise<UserCreditViewModel | undefined> {
    this._loadingService.startLoading('read', 'userAccount');

    return new Promise<UserCreditViewModel | undefined>((resolve, reject) => {
      this._profileRepository
        .getUserAccount()
        .pipe(
          tap(() => this._loadingService.stopLoading('read', 'userAccount')),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (result) => resolve(result.result!),
          error: () => {
            reject(undefined),
              this._loadingService.stopLoading('read', 'userAccount');
          },
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
