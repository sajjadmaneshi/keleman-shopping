import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ApplicationStateService } from '../../../shared/services/application-state.service';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../../shared/services/auth/auth.service';
import { BasketService } from '../../pages/checkout/services/basket.service';

@Component({
  selector: 'keleman-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnDestroy {
  basketCount = 0;
  destroy$ = new Subject<void>();
  isLoggedIn = false;
  @ViewChild('header', { static: true }) header!: ElementRef;
  constructor(
    public applicationState: ApplicationStateService,
    private readonly _basketService: BasketService,
    private readonly _authService: AuthService
  ) {
    this._authService.isLoggedIn$.subscribe((result) => {
      this.isLoggedIn = result;
    });

    this._basketService.cartCount$
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
