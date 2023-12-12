import { Component, Input } from '@angular/core';
import { UserCommentViewModel } from '../../../data/view-models/user-comment.view-model';
import { PersianDateTimeService } from '../../../../../../shared/services/date-time/persian-datetime.service';
import { UserQuestionViewModel } from '../../../data/view-models/user-question.view-model';

@Component({
  selector: 'keleman-user-question-item',
  templateUrl: './user-question-item.component.html',
  styleUrls: ['./user-question-item.component.scss'],
})
export class UserQuestionItemComponent {
  @Input() questionData!: UserQuestionViewModel;
  constructor(public readonly persianDateTimeService: PersianDateTimeService) {}
}
