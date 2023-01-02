import { Component, Input } from '@angular/core';
import { CommentModel } from '../../../../../../../../shared/models/comment.model';
import { PersianDateTimeService } from '../../../../../../../../shared/services/date-time/persian-datetime.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent {
  constructor(public persianDatatime: PersianDateTimeService) {}
  @Input() comment!: CommentModel;
}
