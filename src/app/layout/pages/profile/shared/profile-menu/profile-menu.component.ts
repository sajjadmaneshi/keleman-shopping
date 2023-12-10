import { Component, OnDestroy } from '@angular/core';
import { ProfileService } from '../profile.service';
import { ProfileViewModel } from '../../data/view-models/profile.view-model';
import { ProfileRepository } from '../../data/profile.repository';
import { BehaviorSubject, Subject, takeUntil, tap, combineLatest } from 'rxjs';
import { FileManagementService } from '../../../../../shared/services/file-management.service';
import { HttpClientResult } from 'src/app/shared/data/models/http/http-client.result';
import { InitialAppService } from '../../../../../shared/services/initial-app.service';
import { UserCreditViewModel } from '../../data/view-models/user-credit.view-model';
import { AuthService } from '../../../../../shared/services/auth/auth.service';

@Component({
  selector: 'keleman-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
  providers: [FileManagementService],
})
export class ProfileMenuComponent implements OnDestroy {
  isLoading = true;
  personalInfo!: ProfileViewModel;
  userCredit!: UserCreditViewModel;
  fileUploading = new BehaviorSubject(false);
  fileForUpload!: File;

  destroy$ = new Subject<void>();
  constructor(
    private readonly _initialAppService: InitialAppService,
    private readonly _profileRepository: ProfileRepository,

    public readonly fileManagerService: FileManagementService,
    public readonly authService: AuthService
  ) {
    combineLatest(
      this._initialAppService.userSimpleInfo,
      this._initialAppService.userCredit
    )
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe(([userInfo, userCredit]) => {
        this.personalInfo = userInfo;
        this.userCredit = userCredit;
      });
  }

  onChangeFileListener($event: any): void {
    this.fileForUpload = $event.target.files[0];
    if (this.fileForUpload) {
      this.uploadFile(
        this.fileForUpload,
        `.${this.fileForUpload.name.split('.')[1]}`
      );
    }
  }

  public uploadFile($event: any, extension: string) {
    this.fileUploading.next(true);
    if (this.fileManagerService.checkFileSize($event)) {
      if ($event) {
        const formData = new FormData();
        formData.append('file', $event, $event.name);
        this._profileRepository
          .uploadAvatar(formData)
          .pipe(
            tap(() => this.fileUploading.next(false), takeUntil(this.destroy$))
          )
          .subscribe((result: HttpClientResult<string>) => {
            this._initialAppService.userSimpleInfo.next({
              ...this.personalInfo,
              avatar: result.result!,
            });
          });
      }
    } else {
      this.fileManagerService.showTooLargeFileToast();
      this.fileUploading.next(false);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
