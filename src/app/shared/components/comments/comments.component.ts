import { Component } from '@angular/core';
import SwiperCore, { Navigation } from 'swiper';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentDialogComponent } from './add-comment-dialog/add-comment-dialog.component';
import { CommentsDialogComponent } from './comments-dialog/comments-dialog.component';
import { CommentRepository } from './data/repositories/comment.repository';
import { ProductRepository } from '../../../layout/pages/products/data/repositories/product.repository';
import { ProductCommentViewModel } from '../../../layout/pages/products/data/models/view-models/product-comment.view-model';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../../layout/pages/products/product.service';
import { SharedVariablesService } from '../../services/shared-variables.service';

SwiperCore.use([Navigation]);
@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [CommentRepository],
})
export class CommentsComponent {
  isLoading = new BehaviorSubject(false);
  comments: ProductCommentViewModel[] = [];

  subscription!: Subscription;

  constructor(
    private _dialog: MatDialog,
    private _productService: ProductService,
    private _productRepository: ProductRepository,
    public sharedVariablesService: SharedVariablesService
  ) {
    this._getAllComment();
  }

  openAddCommentDialog() {
    this._dialog.open(AddCommentDialogComponent, {
      width: '850px',
      panelClass: 'custom-mat-dialog',
    });
  }

  openAllCommentsDialog() {
    this._dialog.open(CommentsDialogComponent, {
      width: '700px',
      data: this.comments,
      panelClass: 'custom-mat-dialog',
    });
  }

  private _getAllComment() {
    this.isLoading.next(true);
    this.subscription = this._productRepository
      .getProductComments(this._productService.productUrl)
      .pipe(tap(() => this.isLoading.next(false)))
      .subscribe((result) => {
        return (this.comments = [...result.result!]);
      });
  }
}
