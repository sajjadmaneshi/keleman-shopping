import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProfileRepository } from '../data/profile.repository';
import { OrderCountViewModel } from '../data/view-models/order-count.view-model';
import { HttpClientResult } from '../../../../shared/data/models/http/http-client.result';
import { OrdersStatusEnum } from '../data/enums/orders-status.enum';

@Component({
  selector: 'keleman-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrdersComponent implements OnDestroy {
  orderStatus = OrdersStatusEnum;
  selectedIndex$ = new BehaviorSubject<number | null>(null);
  destroy$ = new Subject<void>();
  orderCounts = new OrderCountViewModel();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _profileRepository: ProfileRepository
  ) {
    this._getSelectedIndexFromRoute();
    this._getOrderCount();
  }

  private _getOrderCount() {
    this._profileRepository
      .getOrdersCount()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: HttpClientResult<OrderCountViewModel>) => {
        this.orderCounts = { ...result.result! };
      });
  }

  private _getSelectedIndexFromRoute() {
    this._activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) =>
        this.selectedIndex$.next(params['selected'] || null)
      );
  }

  private _updateQueryParams(selectedIndex: number) {
    this._router
      .navigate([], {
        relativeTo: this._activatedRoute,
        queryParams: { selected: selectedIndex },
        queryParamsHandling: 'merge',
      })
      .finally();
  }

  changeTab(selectedTab: number) {
    this.selectedIndex$.next(selectedTab);
    this._updateQueryParams(selectedTab);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
