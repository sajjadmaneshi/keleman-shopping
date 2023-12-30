import { Component } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { BasketRepository } from '../../data/repositories/basket.repository';
import { BasketCheckoutViewModel } from '../../data/models/basket-checkout.view-model';
import { BasketService } from '../../services/basket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'keleman-purchase-web',
  templateUrl: './purchase-web.component.html',
})
export class PurchaseWebComponent {
  checkout!: BasketCheckoutViewModel;
  addressId!: number;
  billId!: number;

  constructor(
    public checkoutService: CheckoutService,
    private _basketService: BasketService,
    private _router: Router,
    private _basketRepository: BasketRepository
  ) {
    this._basketService.basketCheckout$.subscribe((res) => {
      this.checkout = res;
    });
    this._basketService.delivaryAddress$.subscribe((res) => {
      this.addressId = res!;
    });
    this._basketService.billId.subscribe((res) => {
      this.billId = res!;
    });
  }

  getPreFactor() {
    this._basketRepository.getReport().subscribe((res) => {
      const fileUrl = URL.createObjectURL(res);
      window.open(fileUrl, '_blank');
    });
  }

  submitPay() {
    this._router.navigate(['/callback'], {
      queryParams: { billid: this.billId, status: 1 },
    });
  }
}
