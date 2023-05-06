import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentModel } from '../../../models/comment.model';
import { PersianDateTimeService } from '../../../services/date-time/persian-datetime.service';

@Component({
  selector: 'keleman-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrls: ['./comments-dialog.component.scss'],
})
export class CommentsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CommentModel[],
    public persianDateTime: PersianDateTimeService
  ) {}
}
