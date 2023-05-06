import { Component, Input } from '@angular/core';
import { CommentModel, CommentStatus } from '../../../models/comment.model';
import { PersianDateTimeService } from '../../../services/date-time/persian-datetime.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent {
  constructor(public persianDatetime: PersianDateTimeService) {}
  @Input() comment!: CommentModel;
  @Input() fullWidth: boolean = false;

  commentStatusEnum = CommentStatus;
}
