import { Component } from '@angular/core';
import SwiperCore, { Navigation } from 'swiper';
import { CommentModel } from '../../models/comment.model';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentDialogComponent } from './add-comment-dialog/add-comment-dialog.component';
import { CommentsDialogComponent } from './comments-dialog/comments-dialog.component';
import { SwiperComponent } from '../swiper/swiper.component';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { CommentRepository } from './data/repositories/comment.repository';

SwiperCore.use([Navigation]);
@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [CommentRepository],
})
export class CommentsComponent {
  isLoading = new BehaviorSubject(false);
  comments: CommentModel[] = [];

  constructor(
    private _dialog: MatDialog,
    private _repository: CommentRepository
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
    const getAllComment$ = this._repository
      .getAll()
      .subscribe((comments) => (this.comments = comments));
  }
}
