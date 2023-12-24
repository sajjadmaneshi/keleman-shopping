import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApplicationStateService } from '../../../shared/services/application-state.service';
import { GuestBasketService } from '../../pages/checkout/guest-basket.service';
import { Subject, takeUntil, combineLatest } from 'rxjs';

import { InitialAppService } from '../../../shared/services/initial-app.service';
import { BasketService } from '../../pages/checkout/purchase/basket.service';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'keleman-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  basketCount = 0;
  destroy$ = new Subject<void>();
  isLoggedIn = false;
  @ViewChild('header', { static: true }) header!: ElementRef;
  constructor(
    public applicationState: ApplicationStateService,
    private readonly _basketService: BasketService,
    private readonly _authService: AuthService,
    private readonly _guestBasketService: GuestBasketService
  ) {
    this._authService.isLoggedIn$.subscribe((result) => {
      this.isLoggedIn = result;
    });

    if (this.isLoggedIn) {
      this._basketService.cartCount
        .pipe(takeUntil(this.destroy$))
        .subscribe((result) => {
          this.basketCount = result;
        });
    } else {
      this.basketCount = this._guestBasketService.totalCount;
    }
  }

  getHeader() {
    return this.header.nativeElement;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
