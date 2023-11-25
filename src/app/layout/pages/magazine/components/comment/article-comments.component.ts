import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentRepository } from '../../../../../shared/data/repositories/comment.repository';
import { ArticleCommentViewModel } from '../../../../../shared/data/models/article-comment.view-model';
import { map, Subscription, tap } from 'rxjs';
import { PersianDateTimeService } from '../../../../../shared/services/date-time/persian-datetime.service';
import { AddArticleCommentDto } from './data/add-article-comment.dto';
import { SnackBarService } from '../../../../../shared/components/snack-bar/snack-bar.service';
import { ProductViewModel } from '../../../products/data/models/view-models/product.view-model';
import { AuthService } from '../../../../../shared/services/auth/auth.service';
import { InitialAppService } from '../../../../../shared/services/initial-app.service';

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

  isLoading = false;

  isLoggedIn = false;

  addCommentLoading = false;

  subscriptions = new Subscription();

  get comment(): FormControl {
    return this.commentForm.get('comment') as FormControl;
  }

  get commenter(): FormControl {
    return this.commentForm.get('commenter') as FormControl;
  }

  constructor(
    private _commentRepository: CommentRepository,
    private readonly _snackBar: SnackBarService,
    private readonly _initialAppService: InitialAppService,
    public readonly persianDateTimeService: PersianDateTimeService
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
    this._initialAppService.userSimpleInfo.subscribe((res) => {
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
    this.isLoading = true;
    const subscription = this._commentRepository
      .getArticleComments(this.articleId)
      .pipe(
        tap(() => (this.isLoading = false)),
        map((x) => x.result)
      )
      .subscribe((result) => {
        this.comments = [...result!];
      });
    this.subscriptions.add(subscription);
  }

  submit() {
    this.formIsSubmitted = true;
    if (this.commentForm.valid) {
      this.addCommentLoading = true;
      const dto = {
        articleId: this.articleId,
        commenter: this.commenter.value,
        comment: this.comment.value,
      } as AddArticleCommentDto;
      const subscription = this._commentRepository
        .addArticleComment(dto)
        .pipe(tap(() => (this.addCommentLoading = false)))
        .subscribe(
          (result) => this._handleAfterSuccessComment(),
          (error) => {
            this.addCommentLoading = false;
          }
        );
    }
  }

  private _handleAfterSuccessComment() {
    this._snackBar.showWarningSnackBar('نظر شما با موفقیت ثبت گردی ');
    this._getArticleComments();
  }

  tranckByFn(index: number, item: ArticleCommentViewModel) {
    return item.id;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
