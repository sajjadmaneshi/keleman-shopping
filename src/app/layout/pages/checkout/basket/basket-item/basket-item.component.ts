import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ApplicationStateService } from '../../../../../shared/services/application-state.service';
import { BasketItemViewModel } from '../../data/models/basket-item.view-model';
import { UpdateBasketDto } from '../../data/dto/update-basket.dto';
import { AuthService } from '../../../../../shared/services/auth/auth.service';
import { BasketService } from '../../services/basket.service';

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
    private readonly _basketService: BasketService,
    private readonly _authService: AuthService
  ) {
    this._authService.isLoggedIn$.subscribe((result) => {
      this.isLoggedIn = result;
    });
  }

  removeProduct() {
    const id = this.isLoggedIn
      ? this.basketItem.id!
      : this.basketItem.product.id;

    this._basketService.remove(id).then((result) => {
      if (result) this.remove.emit(this.basketItem);
    });
  }

  updateBasket(count: number) {
    const dto = {
      productId: this.basketItem.product.id,
      // storeId: this.productDetail.stores[0].id,
      count,
    } as UpdateBasketDto;
    this._basketService.updateBasket(dto);
  }
}
