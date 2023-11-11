import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import SwiperCore, { Navigation } from 'swiper';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentDialogComponent } from './add-comment-dialog/add-comment-dialog.component';
import { ProductCommentsDialogComponent } from './comments-dialog/product-comments-dialog.component';

import { ProductRepository } from '../../../data/repositories/product.repository';
import { ProductCommentViewModel } from '../../../data/models/view-models/product-comment.view-model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { SharedVariablesService } from '../../../../../../shared/services/shared-variables.service';
import { CommentRepository } from '../../../../../../shared/data/repositories/comment.repository';
import { AuthService } from '../../../../../../shared/services/auth/auth.service';
import { AlertDialogComponent } from '../../../../../../shared/components/alert-dialog/alert-dialog.component';
import { Routing } from '../../../../../../routing';
import { AlertDialogDataModel } from '../../../../../../shared/components/alert-dialog/alert-dialog-data.model';

SwiperCore.use([Navigation]);
@Component({
  selector: 'product-comments',
  templateUrl: './product-comments.component.html',
  styleUrls: ['./product-comments.component.scss'],
  providers: [CommentRepository],
})
export class ProductCommentsComponent implements OnInit, OnDestroy {
  @Input() productId!: number;

  isLoading = new BehaviorSubject(false);
  comments: ProductCommentViewModel[] = [];

  subscription!: Subscription;

  isLoggedIn = false;

  constructor(
    private _dialog: MatDialog,
    private _productService: ProductService,
    private _commentRepository: CommentRepository,
    public sharedVariablesService: SharedVariablesService,
    private _router: Router,
    private _authService: AuthService
  ) {}

  private _openAddCommentDialog() {
    this._dialog.open(AddCommentDialogComponent, {
      width: '850px',
      panelClass: 'custom-mat-dialog',
      data: this.productId,
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
    this.isLoading.next(true);
    this.subscription = this._commentRepository
      .getProductComments(this.productId)
      .pipe(tap(() => this.isLoading.next(false)))
      .subscribe((result) => {
        return (this.comments = [...result.result!]);
      });
  }

  public addComment() {
    if (this.isLoggedIn) this._openAddCommentDialog();
    else this.openRegisterBeforeActionDialog();
  }

  openRegisterBeforeActionDialog() {
    const dialogRef = this._dialog.open(AlertDialogComponent, {
      data: {
        message: 'لطفا برای ثبت نظر ابتدا وارد سایت شوید',
        callBackButtonText: 'واردشوید',
        callBackFunction: () =>
          this._router.navigate([Routing.register], {
            queryParams: { redirectUrl: this._router.routerState.snapshot.url },
          }),
      } as AlertDialogDataModel,
    });
  }

  ngOnInit(): void {
    if (this.productId) this._getAllComment();
    this._authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
