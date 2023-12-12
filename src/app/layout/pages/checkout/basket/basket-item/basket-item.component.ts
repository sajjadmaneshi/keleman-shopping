import { Component, Input } from '@angular/core';

import { ApplicationStateService } from '../../../../../shared/services/application-state.service';
import { BasketItemViewModel } from '../../data/models/basket-item.view-model';
import { GuestBasketModel } from '../../data/models/guest-basket.model';
import { ProductDetailViewModel } from '../../../products/data/models/view-models/product-detail.view-model';
import { GuestBasketService } from '../../guest-basket.service';
import {
  BasketViewModel,
  CartItemViewModel,
} from '../../data/models/basket.view-model';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss'],
})
export class BasketItemComponent {
  @Input() guestBasketItem!: { product: ProductDetailViewModel; count: number };
  @Input() basketItem!: CartItemViewModel;
  constructor(
    public applicationStateService: ApplicationStateService,
    private readonly _basketService: GuestBasketService
  ) {}

  removeProduct() {
    this._basketService.removeProduct(this.guestBasketItem);
  }

  addToBasket() {
    this._basketService.addToBasket(this.guestBasketItem);
  }

  removeFromBasket() {
    this._basketService.removeFromBasket(this.guestBasketItem.product.id);
  }
}
