import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersianDateTimeService } from '../../../../../../../shared/services/date-time/persian-datetime.service';
import { ProductCommentViewModel } from '../../../../data/models/view-models/product-comment.view-model';

@Component({
  selector: 'keleman-product-comment-question-dialog',
  templateUrl: './product-comments-dialog.component.html',
  styleUrls: ['./product-comments-dialog.component.scss'],
})
export class ProductCommentsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductCommentViewModel[],
    public persianDateTime: PersianDateTimeService
  ) {}
}
