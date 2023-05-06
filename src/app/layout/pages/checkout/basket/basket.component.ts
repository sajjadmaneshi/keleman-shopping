import { Component } from '@angular/core';
import { BasketRepository } from '../data/repositories/basket.repository';
import { BasketItemViewModel } from '../data/models/basket-item.view-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'keleman-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  providers: [BasketRepository],
})
export class BasketComponent {
  basketItems: BasketItemViewModel[] = [];
  subscriptions = new Subscription();
  constructor(private _repository: BasketRepository) {
    this._getBasketItems();
  }

  private _getBasketItems() {
    const getBasketItems$ = this._repository.getAll().subscribe((result) => {
      this.basketItems = result;
    });
    this.subscriptions.add(getBasketItems$);
  }
}
