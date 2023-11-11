import { Component, Input } from '@angular/core';
import { PersianDateTimeService } from '../../../../../../../shared/services/date-time/persian-datetime.service';
import { ProductCommentViewModel } from '../../../../data/models/view-models/product-comment.view-model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './product-comment-item.component.html',
  styleUrls: ['./product-comment-item.component.scss'],
})
export class ProductCommentItemComponent {
  constructor(public persianDatetime: PersianDateTimeService) {}
  @Input() comment!: ProductCommentViewModel;
  @Input() fullWidth: boolean = false;
}
