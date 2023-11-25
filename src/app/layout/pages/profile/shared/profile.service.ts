import { Injectable, OnDestroy } from '@angular/core';
import { ProfileRepository } from '../data/profile.repository';
import { ProfileViewModel } from '../data/view-models/profile.view-model';
import { Subject, takeUntil, tap } from 'rxjs';
import { HttpClientResult } from '../../../../shared/data/models/http/http-client.result';
import { UserSimpleInfoViewModel } from '../../../../shared/data/models/view-models/user-simple-info.view-model';
import { UserCreditViewModel } from '../data/view-models/user-credit.view-model';

@Injectable({ providedIn: 'root' })
export class ProfileService implements OnDestroy {
  personalInfo = new Subject<ProfileViewModel>();
  isLoading = false;

  destroy$ = new Subject<void>();
  constructor(private readonly _profileRepository: ProfileRepository) {}

  public getPersonalInfo(): Promise<ProfileViewModel | undefined> {
    this.isLoading = true;
    return new Promise<ProfileViewModel | undefined>((resolve, reject) => {
      this._profileRepository
        .getProfile()
        .pipe(
          tap(() => (this.isLoading = false)),
          takeUntil(this.destroy$)
        )
        .subscribe(
          (result) => {
            resolve(result.result!);
          },
          (error) => {
            reject(undefined);
          }
        );
    });
  }

  public getUserAccount(): Promise<UserCreditViewModel | undefined> {
    this.isLoading = true;
    return new Promise<UserCreditViewModel | undefined>((resolve, reject) => {
      this._profileRepository
        .getUserAccount()
        .pipe(
          tap(() => (this.isLoading = false)),
          takeUntil(this.destroy$)
        )
        .subscribe(
          (result) => {
            resolve(result.result!);
          },
          (error) => {
            reject(undefined);
          }
        );
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
