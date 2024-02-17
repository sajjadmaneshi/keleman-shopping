import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import SwiperCore, { Navigation } from 'swiper';
import { Subject, takeUntil, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentDialogComponent } from './add-comment-dialog/add-comment-dialog.component';
import { ProductCommentsDialogComponent } from './comments-dialog/product-comments-dialog.component';
import { ProductCommentViewModel } from '../../../data/models/view-models/product-comment.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedVariablesService } from '../../../../../../shared/services/shared-variables.service';
import { CommentRepository } from '../../../../../../shared/data/repositories/comment.repository';
import { AuthService } from '../../../../../../shared/services/auth/auth.service';
import { AlertDialogComponent } from '../../../../../../shared/components/alert-dialog/alert-dialog.component';
import { Routing } from '../../../../../../routing';
import { AlertDialogDataModel } from '../../../../../../shared/components/alert-dialog/alert-dialog-data.model';
import { LoadingService } from '../../../../../../../common/services/loading.service';

SwiperCore.use([Navigation]);
@Component({
  selector: 'product-comments',
  templateUrl: './product-comments.component.html',
  styleUrls: ['./product-comments.component.scss'],
  providers: [CommentRepository],
})
export class ProductCommentsComponent implements OnInit, OnDestroy {
  @Input() productId!: number;

  comments: ProductCommentViewModel[] = [];

  destroy$ = new Subject<void>();

  isLoggedIn = false;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _commentRepository: CommentRepository,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _authService: AuthService,
    public readonly sharedVariablesService: SharedVariablesService,
    public readonly loadingService: LoadingService
  ) {}

  private _openAddCommentDialog() {
    this._dialog.open(AddCommentDialogComponent, {
      width: '850px',
      panelClass: 'custom-mat-dialog',
      data: this.productId,
      autoFocus: false,
    });
  }

  openAllCommentsDialog() {
    this._dialog.open(ProductCommentsDialogComponent, {
      width: '700px',
      data: this.comments,
      panelClass: 'custom-mat-dialog',
    });
  }

  private _getAllComment() {
    this.loadingService.startLoading('read', 'comments');
    this._commentRepository
      .getProductComments(this.productId)
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'comments')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => {
          return (this.comments = [...result.result!]);
        },
        error: () => this.loadingService.stopLoading('read', 'comments'),
      });
  }

  public addComment() {
    if (this.isLoggedIn) this._openAddCommentDialog();
    else this.openRegisterBeforeActionDialog();
  }

  openRegisterBeforeActionDialog() {
    this._dialog.open(AlertDialogComponent, {
      data: {
        message: 'لطفا برای ثبت نظر ابتدا وارد سایت شوید',
        callBackButtonText: 'واردشوید',
        callBackFunction: () =>
          this._router.navigate([Routing.register], {
            queryParams: {
              redirectUrl: this._router.routerState.snapshot.url,
              openAddCommentDialog: true,
            },
          }),
      } as AlertDialogDataModel,
    });
  }

  ngOnInit(): void {
    if (this.productId) this._getAllComment();
    this._authService.isLoggedIn$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });
    this._activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        if (params['openAddCommentDialog']) this._openAddCommentDialog();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
