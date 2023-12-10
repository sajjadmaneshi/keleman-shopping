import { Component } from '@angular/core';
import { ProductCommentViewModel } from '../../../../shared/data/models/product-comment.view-model';
import { ProfileRepository } from '../data/profile.repository';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { UserCommentViewModel } from '../data/view-models/user-comment.view-model';

@Component({
  selector: 'keleman-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.scss'],
})
export class UserCommentsComponent {
  comments: UserCommentViewModel[] = [];

  isLoading = true;
  destroy$ = new Subject<void>();

  page = 1;
  limit = 10;

  totalElements = 0;

  allowToshow: boolean | undefined;

  constructor(private readonly _profileRepository: ProfileRepository) {
    this._getUserComments();
  }

  private _getUserComments() {
    this._profileRepository
      .getComments(this.page - 1, this.limit, this.allowToshow)
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$),
        map((res) => res.result!)
      )
      .subscribe(
        (result) => {
          this.comments = [...result.items];
          this.totalElements = result.totalElements;
        },
        () => (this.isLoading = false)
      );
  }

  filterComments(allowToshow?: boolean) {
    this.allowToshow = allowToshow;
    this._getUserComments();
  }

  pageChange($event: number) {
    this.page = $event;
    this._getUserComments();
  }
}
