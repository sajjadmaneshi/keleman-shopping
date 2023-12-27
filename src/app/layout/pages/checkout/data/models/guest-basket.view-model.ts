import { BasketItemViewModel } from './basket-item.view-model';

export class GuestBasketViewModel {
  constructor(public items: BasketItemViewModel[] = []) {}
}
