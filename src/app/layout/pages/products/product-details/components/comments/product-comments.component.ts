import { Component } from '@angular/core';
import SwiperCore, { Navigation } from 'swiper';
import { CommentModel } from '../../../../../../shared/models/comment.model';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentDialogComponent } from './add-comment-dialog/add-comment-dialog.component';
import { ProductCommentsDialogComponent } from './product-comments-dialog/product-comments-dialog.component';

SwiperCore.use([Navigation]);
@Component({
  selector: 'keleman-product-comments',
  templateUrl: './product-comments.component.html',
  styleUrls: ['./product-comments.component.scss'],
})
export class ProductCommentsComponent {
  isLoading = new BehaviorSubject(false);
  slides: CommentModel[] = [
    {
      commenter: 'سجاد منشی',
      comment:
        'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-01-01T13:34:45',
      status: 1,
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2023-01-01T13:34:45',
      status: 0,
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
      status: 2,
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
      status: 1,
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
      status: 2,
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
      status: 0,
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
      status: 2,
    },
    {
      commenter: 'سجاد منشی',
      comment: 'نسبتا موتور خوب و با کیفیتی است پیشنهاد میکنم',
      date: '2022-02-01T13:34:45',
      status: 1,
    },
  ];

  constructor(private _dialog: MatDialog) {}

  openAddCommentDialog() {
    this._dialog.open(AddCommentDialogComponent, {
      width: '850px',
      panelClass: 'custom-mat-dialog',
    });
  }

  openAllCommentsDialog() {
    this._dialog.open(ProductCommentsDialogComponent, {
      width: '700px',
      data: this.slides,
      panelClass: 'custom-mat-dialog',
    });
  }
}
