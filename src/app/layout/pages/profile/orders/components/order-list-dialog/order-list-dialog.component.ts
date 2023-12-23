import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductCommentViewModel } from '../../../../products/data/models/view-models/product-comment.view-model';
import { PersianDateTimeService } from '../../../../../../shared/services/date-time/persian-datetime.service';
import { OrderProduct } from '../../../data/view-models/order.view.model';

@Component({
  selector: 'keleman-order-list-dialog',
  templateUrl: './order-list-dialog.component.html',
  styleUrls: ['./order-list-dialog.component.scss'],
})
export class OrderListDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: OrderProduct[]) {}
}
