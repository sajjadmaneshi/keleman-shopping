import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentModel } from '../../../../../../../shared/models/comment.model';
import { PersianDateTimeService } from '../../../../../../../shared/services/date-time/persian-datetime.service';

@Component({
  selector: 'keleman-product-comments-dialog',
  templateUrl: './product-comments-dialog.component.html',
  styleUrls: ['./product-comments-dialog.component.scss'],
})
export class ProductCommentsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CommentModel[],
    public persianDateTime: PersianDateTimeService
  ) {}
}
