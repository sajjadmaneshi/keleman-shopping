import { Component, OnInit } from '@angular/core';
import { BasketService } from './purchase/basket.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  isBasketFull = false;
  constructor(
    private _basketService: BasketService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.handleUserAuthentication();
    this._basketService.cartCount.subscribe(
      (result) => (this.isBasketFull = result > 0)
    );
  }

  private handleUserAuthentication(): void {
    this._authService.isLoggedIn$.pipe(take(1)).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.loadBasketData();
      }
    });
  }

  private loadBasketData(): void {
    this._basketService.getBasket();
    this._basketService.getBasketCheckout();
    this._basketService.getPaymentGateways();
  }
}
