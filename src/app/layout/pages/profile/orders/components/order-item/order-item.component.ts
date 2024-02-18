import { Component, Input, OnDestroy } from '@angular/core';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';
import { MatDialog } from '@angular/material/dialog';

import { OrderViewModel } from '../../../data/view-models/order.view-model';
import { PersianDateTimeService } from '../../../../../../shared/services/date-time/persian-datetime.service';
import { OrdersStatusEnum } from '../../../data/enums/orders-status.enum';
import { OrderListDialogComponent } from '../order-list-dialog/order-list-dialog.component';
import { ProfileRepository } from '../../../data/profile.repository';
import { AddReturnRequestDialogComponent } from '../../../returned-request/add-return-request-dialog/add-return-request-dialog.component';
import { OrderCanReturnViewModel } from '../../../data/view-models/order-can-return.view-model';
import { Subscription, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'keleman-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnDestroy {
  @Input() orderDetail!: OrderViewModel;
  @Input() orderStatus!: OrdersStatusEnum;

  orderstatusEnum = OrdersStatusEnum;
  subscriptions = new Subscription();
  getFactorLoading = false;
  constructor(
    public readonly applicationState: ApplicationStateService,
    public readonly persianDateTimeService: PersianDateTimeService,
    private readonly _profileRepository: ProfileRepository,
    private readonly _dialog: MatDialog
  ) {}

  openReturnRequestDialog(): void {
    const productsWithReasonId = this.orderDetail.products.map((product) => ({
      ...product,
      reasonId: -1,
    }));
    this._dialog.open(AddReturnRequestDialogComponent, {
      width: '1000px',
      data: {
        ...this.orderDetail,
        products: productsWithReasonId,
      } as OrderCanReturnViewModel,
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

  getOrderFactor() {
    this.getFactorLoading = true;
    const subscription = this._profileRepository
      .getOrderFactor(this.orderDetail.id)
      .pipe(tap(() => (this.getFactorLoading = false)))
      .subscribe({
        next: (res) => {
          const fileUrl = URL.createObjectURL(res);
          window.open(fileUrl, '_blank');
        },
        error: () => (this.getFactorLoading = false),
      });
    this.subscriptions.add(subscription);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
