import { Component, Input } from '@angular/core';

import { ApplicationStateService } from '../../../../../shared/services/application-state.service';
import { BasketItemViewModel } from '../../data/models/basket-item.view-model';
import { GuestBasketModel } from '../../data/models/guest-basket.model';
import { ProductDetailViewModel } from '../../../products/data/models/view-models/product-detail.view-model';
import { GuestBasketService } from '../../guest-basket.service';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss'],
})
export class BasketItemComponent {
  @Input() basketItem!: { product: ProductDetailViewModel; count: number };
  constructor(
    public applicationStateService: ApplicationStateService,
    private readonly _basketService: GuestBasketService
  ) {}

  removeProduct() {
    this._basketService.removeProduct(this.basketItem);
  }

  addToBasket() {
    this._basketService.addToBasket(this.basketItem);
  }

  removeFromBasket() {
    this._basketService.removeFromBasket(this.basketItem.product.id);
  }
}
