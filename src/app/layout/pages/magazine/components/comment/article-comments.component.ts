import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentRepository } from '../../../../../shared/data/repositories/comment.repository';
import { ArticleCommentViewModel } from '../../../../../shared/data/models/article-comment.view-model';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { PersianDateTimeService } from '../../../../../shared/services/date-time/persian-datetime.service';
import { AddArticleCommentDto } from './data/add-article-comment.dto';
import { SnackBarService } from '../../../../../shared/components/snack-bar/snack-bar.service';
import { InitialAppService } from '../../../../../shared/services/initial-app.service';
import { LoadingService } from '../../../../../../common/services/loading.service';

@Component({
  selector: 'article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.scss'],
})
export class ArticleCommentsComponent implements OnInit, OnDestroy {
  @Input() articleId!: number;

  comments: ArticleCommentViewModel[] = [];
  commentForm!: FormGroup;
  formIsSubmitted = false;
  isLoggedIn = false;
  destroy$ = new Subject<void>();

  get comment(): FormControl {
    return this.commentForm.get('comment') as FormControl;
  }

  get commenter(): FormControl {
    return this.commentForm.get('commenter') as FormControl;
  }

  constructor(
    private readonly _commentRepository: CommentRepository,
    private readonly _snackBar: SnackBarService,
    private readonly _initialAppService: InitialAppService,
    public readonly persianDateTimeService: PersianDateTimeService,
    public readonly loadingService: LoadingService
  ) {
    this._initForm();
  }

  ngOnInit(): void {
    if (this.articleId) {
      this._getArticleComments();
      this._setLoggedInUserInfo();
    }
  }

  private _setLoggedInUserInfo() {
    this._initialAppService.userSimpleInfo
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.commenter.patchValue(`${res.firstName} ${res.lastName}`);
        }
      });
  }

  private _initForm() {
    this.commentForm = new FormGroup({
      comment: new FormControl('', Validators.required),
      commenter: new FormControl('', Validators.required),
    });
  }

  private _getArticleComments() {
    this.loadingService.startLoading('read', 'articleComment');
    this._commentRepository
      .getArticleComments(this.articleId)
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'articleComment')),
        takeUntil(this.destroy$),
        map((x) => x.result)
      )
      .subscribe({
        next: (result) => (this.comments = [...result!]),
        error: () => this.loadingService.stopLoading('read', 'articleComment'),
      });
  }

  submit() {
    this.formIsSubmitted = true;
    if (this.commentForm.valid) {
      this.loadingService.startLoading('add', 'articleComment');
      const dto = {
        articleId: this.articleId,
        commenter: this.commenter.value,
        comment: this.comment.value,
      } as AddArticleCommentDto;
      this._commentRepository
        .addArticleComment(dto)
        .pipe(
          tap(() => this.loadingService.stopLoading('add', 'articleComment')),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: () => this._handleAfterSuccessComment(),
          error: () => this.loadingService.stopLoading('add', 'articleComment'),
        });
    }
  }

  private _handleAfterSuccessComment() {
    this._snackBar.showWarningSnackBar('نظر شما با موفقیت ثبت گردی ');
    this._getArticleComments();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
