import { Component, Input } from '@angular/core';
import { GuestBasketService } from '../../../guest-basket.service';

@Component({
  selector: 'keleman-main-purchase',
  templateUrl: './main-purchase.component.html',
  styleUrls: ['./main-purchase.component.scss'],
})
export class MainPurchaseComponent {
  totalPrice: number = 0;
  constructor(private _basketServie: GuestBasketService) {
    this._basketServie.totalPrice$.subscribe((res) => {
      this.totalPrice = res;
    });
  }
}
