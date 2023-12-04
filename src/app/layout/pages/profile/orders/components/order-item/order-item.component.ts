import { Component, Input } from '@angular/core';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';
import { MatDialog } from '@angular/material/dialog';
import { ReturnRequestDialogComponent } from './return-request-dialog/return-request-dialog.component';
import { OrderViewModel } from '../../../data/view-models/order-view.model';
import { PersianDateTimeService } from '../../../../../../shared/services/date-time/persian-datetime.service';
import { OrdersStatusEnum } from '../../../data/enums/orders-status.enum';
import { OrderListDialogComponent } from '../order-list-dialog/order-list-dialog.component';

@Component({
  selector: 'keleman-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent {
  @Input() orderDetail!: OrderViewModel;
  @Input() orderStatus!: OrdersStatusEnum;

  orderstatusEnum = OrdersStatusEnum;
  constructor(
    public applicationState: ApplicationStateService,
    public persianDateTimeService: PersianDateTimeService,
    private _dialog: MatDialog
  ) {}

  openReturnRequestDialog(): void {
    this._dialog.open(ReturnRequestDialogComponent, {
      width: '550px',
      panelClass: 'custom-mat-dialog',
    });
  }

  openOrderProductsList() {
    this._dialog.open(OrderListDialogComponent, {
      width: '500px',
      data: this.orderDetail.products,
    });
  }

  public determineProductsName() {
    return this.orderDetail.products.map((x) => x.name).join(',');
  }
}
