import { Component, OnDestroy } from '@angular/core';
import { ProfileRepository } from '../../data/profile.repository';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { UserCommentViewModel } from '../../data/view-models/user-comment.view-model';
import { LoadingService } from '../../../../../../common/services/loading.service';

@Component({
  selector: 'keleman-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.scss'],
})
export class UserCommentsComponent implements OnDestroy {
  comments: UserCommentViewModel[] = [];
  destroy$ = new Subject<void>();
  page = 1;
  limit = 10;
  totalElements = 0;
  allowToshow: boolean | undefined;

  constructor(
    private readonly _profileRepository: ProfileRepository,
    public loadingService: LoadingService
  ) {
    this.loadingService.startLoading('read', 'userComments');
    this._getUserComments();
  }

  private _getUserComments() {
    this._profileRepository
      .getComments(this.page - 1, this.limit, this.allowToshow)
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'userComments')),
        takeUntil(this.destroy$),
        map((res) => res.result!)
      )
      .subscribe({
        next: (result) => {
          this.comments = [...result.items];
          this.totalElements = result.totalElements;
        },
        error: () => this.loadingService.startLoading('read', 'userComments'),
      });
  }

  filterComments(allowToshow?: boolean) {
    this.allowToshow = allowToshow;
    this._getUserComments();
  }

  pageChange($event: number) {
    this.page = $event;
    this._getUserComments();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
