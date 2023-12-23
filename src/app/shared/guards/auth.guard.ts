import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Routing } from '../../routing';
@Injectable({ providedIn: 'root' })
export class AuthGuard {
  destroy$ = new Subject<void>();
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  canActivate(): boolean {
    let flag = false;
    this._authService.isLoggedIn$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn) flag = true;
        else {
          this._router.navigate([Routing.register]);
          flag = false;
        }
      });
    return flag;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
export const authGuard: CanActivateFn = (): boolean => {
  return inject(AuthGuard).canActivate();
};
