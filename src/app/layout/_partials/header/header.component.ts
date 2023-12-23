import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApplicationStateService } from '../../../shared/services/application-state.service';
import { GuestBasketService } from '../../pages/checkout/guest-basket.service';
import { Subject, takeUntil, combineLatest } from 'rxjs';

import { InitialAppService } from '../../../shared/services/initial-app.service';
import { BasketService } from '../../pages/checkout/purchase/basket.service';

@Component({
  selector: 'keleman-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  basketCount = 0;
  destroy$ = new Subject<void>();
  @ViewChild('header', { static: true }) header!: ElementRef;
  constructor(
    public applicationState: ApplicationStateService,
    private readonly _basketService: BasketService
  ) {
    this._basketService.cartCount

      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.basketCount = result;
      });
  }

  getHeader() {
    return this.header.nativeElement;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
