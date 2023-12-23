import { Component, Input } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { BasketService } from '../basket.service';
import { BasketRepository } from '../../data/repositories/basket.repository';

@Component({
  selector: 'keleman-purchase-web',
  templateUrl: './purchase-web.component.html',
})
export class PurchaseWebComponent {
  constructor(
    public checkoutService: CheckoutService,
    public basketService: BasketService,
    private _basketRepository: BasketRepository
  ) {}

  getPreFactor() {
    this._basketRepository.getReport().subscribe((res) => {
      const fileUrl = URL.createObjectURL(res);
      window.open(fileUrl, '_blank');
    });
  }
}
