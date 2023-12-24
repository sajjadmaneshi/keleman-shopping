import { BasketItemViewModel } from './basket-item.view-model';

export class GuestBasketViewModel {
  constructor(
    public items: BasketItemViewModel[] = [],
    public totalCount: number = 0,
    public totalPrice: number = 0
  ) {}
}
