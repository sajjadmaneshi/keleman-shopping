import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ApplicationStateService } from '../../../../../shared/services/application-state.service';
import { BasketItemViewModel } from '../../data/models/basket-item.view-model';

import { ProductDetailViewModel } from '../../../products/data/models/view-models/product-detail.view-model';
import { GuestBasketService } from '../../guest-basket.service';
import { BasketService } from '../../purchase/basket.service';
import { UpdateBasketDto } from '../../data/dto/update-basket.dto';
import { AuthService } from '../../../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss'],
})
export class BasketItemComponent {
  @Input() basketItem!: BasketItemViewModel;
  @Output() remove = new EventEmitter<BasketItemViewModel>();
  isLoggedIn = false;
  constructor(
    public applicationStateService: ApplicationStateService,
    private readonly _guestBasketService: GuestBasketService,
    private readonly _basketService: BasketService,
    private readonly _authService: AuthService
  ) {
    this._authService.isLoggedIn$.subscribe((result) => {
      this.isLoggedIn = result;
    });
  }

  removeProduct() {
    if (this.isLoggedIn) {
      this._basketService.remove(this.basketItem.id!).subscribe((result) => {
        if (result) this.remove.emit(this.basketItem);
      });
    } else this._guestBasketService.removeProduct(this.basketItem);
  }

  updateBasketAuthorized(count: number) {
    const dto = {
      productId: this.basketItem.product.id,
      // storeId: this.productDetail.stores[0].id,
      count,
    } as UpdateBasketDto;
    this._basketService.updateBasket(dto);
  }

  addToBasketGuest() {
    this._guestBasketService.addToBasket(this.basketItem);
  }

  removeFromBasketGuest() {
    this._guestBasketService.removeFromBasket(this.basketItem.product.id);
  }
}
