import { Component, Input } from '@angular/core';
import {
  CommentModel,
  CommentStatus,
} from '../../../../../../../shared/models/comment.model';
import { PersianDateTimeService } from '../../../../../../../shared/services/date-time/persian-datetime.service';
import { TextWithIconComponent } from '../../../../../../../shared/components/text-with-icon/text-with-icon.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
  imports: [NgClass, TextWithIconComponent],
  standalone: true,
})
export class CommentItemComponent {
  constructor(public persianDatetime: PersianDateTimeService) {}
  @Input() comment!: CommentModel;
  @Input() fullWidth: boolean = false;

  commentStatusEnum = CommentStatus;
}
