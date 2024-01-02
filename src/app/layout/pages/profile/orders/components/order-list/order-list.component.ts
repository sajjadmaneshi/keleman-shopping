import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { OrderViewModel } from '../../../data/view-models/order.view-model';
import { ProfileRepository } from '../../../data/profile.repository';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { OrdersStatusEnum } from '../../../data/enums/orders-status.enum';
import { LoadingService } from '../../../../../../../common/services/loading.service';
@Component({
  selector: 'keleman-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnDestroy, AfterViewInit {
  @Input() status: OrdersStatusEnum = OrdersStatusEnum.Current;

  orderPaidStatus: boolean | undefined;
  statusEnum = OrdersStatusEnum;
  orders: OrderViewModel[] = [];
  totalElements = 0;
  page = 1;
  limit = 5;
  isPaid = false;
  destroy$ = new Subject<void>();

  constructor(
    private readonly _profileRepository: ProfileRepository,
    public loadingService: LoadingService
  ) {
    loadingService.startLoading('read', 'orders');
  }

  private _getOrders() {
    this._profileRepository
      .getOrders(this.page - 1, this.limit, this.orderPaidStatus, this.status)
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'orders')),
        takeUntil(this.destroy$),
        map((order) => order.result!)
      )

      .subscribe({
        next: (result) => {
          this.orders = [...result.items];
          this.totalElements = result.totalElements;
        },
        error: () => this.loadingService.stopLoading('read', 'orders'),
      });
  }

  filterOrders(isPaid?: boolean) {
    this.orderPaidStatus = isPaid;
    this._getOrders();
  }

  pageChange($event: number) {
    this.page = $event;
    this._getOrders();
  }

  ngAfterViewInit(): void {
    this._getOrders();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
