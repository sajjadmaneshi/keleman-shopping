import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { take } from 'rxjs/operators';
import { BasketService } from './services/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  isBasketFull = false;
  constructor(private _basketService: BasketService) {}

  ngOnInit(): void {
    this.loadBasketData();
    this._basketService.cartCount$.subscribe(
      (result) => (this.isBasketFull = result > 0)
    );
  }

  private loadBasketData(): void {
    this._basketService.basket();
    this._basketService.checkout();
    this._basketService.paymentGateways();
  }
}
