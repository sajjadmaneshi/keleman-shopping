import { CanActivateFn, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { Routing } from '../../../../routing';
import { BasketService } from '../services/basket.service';
@Injectable({ providedIn: 'root' })
export class BasketPaymentGuard {
  destroy$ = new Subject<void>();
  delivaryAddress!: number;
  constructor(
    private readonly _basketService: BasketService,
    private readonly _router: Router
  ) {}

  canActivate(): boolean {
    let flag = false;
    this._basketService.delivaryAddress$
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          flag = true;
        } else {
          this._router.navigate([`/checkout/${Routing.basket}`]);
        }
      });

    return flag;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
export const basketPaymentGuard: CanActivateFn = (): boolean => {
  return inject(BasketPaymentGuard).canActivate();
};
