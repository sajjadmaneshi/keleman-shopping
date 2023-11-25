import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { OrderViewModel } from '../../../data/view-models/order-view.model';
import { ProfileRepository } from '../../../data/profile.repository';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { OrdersStatusEnum } from '../../../data/enums/orders-status.enum';
import { SelectedFilterModel } from '../../../../products/product-list/components/product-filters/data/selected-filter.model';
import { OrdersComponent } from '../../orders.component';

@Component({
  selector: 'keleman-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnDestroy, AfterViewInit {
  orderPaidStatus: boolean | null = null;

  @Input() status: OrdersStatusEnum = OrdersStatusEnum.Current;

  statusEnum = OrdersStatusEnum;

  isLoading = true;
  orders: OrderViewModel[] = [];
  filteredOrders: OrderViewModel[] = [];
  totalElements = 0;

  page = 1;
  limit = 5;

  destroy$ = new Subject<void>();

  constructor(private readonly _profileRepository: ProfileRepository) {}

  private _getOrders() {
    this._profileRepository
      .getOrders(this.page - 1, this.limit, this.status)
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$),
        map((order) => order.result!)
      )

      .subscribe((result) => {
        this.orders = [...result.items];
        this.filteredOrders = [...this.orders];
        this.totalElements = result.totalElements;
      });
  }

  filterOrders(isPaid: boolean | null): void {
    this.orderPaidStatus = isPaid;
    this.filteredOrders =
      isPaid === null
        ? this.orders
        : this.orders.filter((order) => order.isPaid === isPaid);
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