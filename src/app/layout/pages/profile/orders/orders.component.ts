import { Component, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'keleman-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrdersComponent {
  selectedIndex$ = new BehaviorSubject<number>(0);

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this._getSelectedIndexFromRoute();
  }

  private _getSelectedIndexFromRoute() {
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['selected']) {
        this.selectedIndex$.next(params['selected']);
      } else {
        this._updateQueryParams(0);
      }
    });
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
}
