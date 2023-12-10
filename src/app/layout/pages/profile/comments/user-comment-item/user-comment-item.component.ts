import { Component, Input } from '@angular/core';
import { UserCommentViewModel } from '../../data/view-models/user-comment.view-model';
import { PersianDateTimeService } from '../../../../../shared/services/date-time/persian-datetime.service';

@Component({
  selector: 'keleman-user-comment-item',
  templateUrl: './user-comment-item.component.html',
  styleUrls: ['./user-comment-item.component.scss'],
})
export class UserCommentItemComponent {
  @Input() commentData!: UserCommentViewModel;
  constructor(public readonly persianDateTimeService: PersianDateTimeService) {}
}
