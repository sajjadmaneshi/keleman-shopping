import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderProduct } from '../../../data/view-models/order.view-model';

@Component({
  selector: 'keleman-order-list-dialog',
  templateUrl: './order-list-dialog.component.html',
})
export class OrderListDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: OrderProduct[]) {}
}
