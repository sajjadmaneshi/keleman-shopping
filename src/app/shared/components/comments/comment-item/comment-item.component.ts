import { Component, Input } from '@angular/core';
import {
  CommentModel,
  CommentStatus,
} from '../../../data/models/comment.model';
import { PersianDateTimeService } from '../../../services/date-time/persian-datetime.service';
import { ProductCommentViewModel } from '../../../../layout/pages/products/data/models/view-models/product-comment.view-model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent {
  constructor(public persianDatetime: PersianDateTimeService) {}
  @Input() comment!: ProductCommentViewModel;
  @Input() fullWidth: boolean = false;

  commentStatusEnum = CommentStatus;
}
