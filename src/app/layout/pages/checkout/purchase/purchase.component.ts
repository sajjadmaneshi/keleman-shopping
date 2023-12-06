import { Component, Input, OnInit, Renderer2 } from '@angular/core';

import { ApplicationStateService } from '../../../../shared/services/application-state.service';
import { GuestBasketService } from '../guest-basket.service';

@Component({
  selector: 'keleman-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  totalPrice: number = 0;
  constructor(
    public applicationState: ApplicationStateService,
    private _renderer: Renderer2,
    private _basketService: GuestBasketService
  ) {}

  ngOnInit(): void {
    this._basketService.basket$.subscribe((result) => {
      this.totalPrice = result.totalPrice;
    });
  }
}
