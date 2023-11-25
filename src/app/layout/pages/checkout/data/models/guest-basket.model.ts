import { AddToBasketDto } from '../dto/add-to-basket.dto';
import { ProductViewModel } from '../../../products/data/models/view-models/product.view-model';
import { ProductDetailViewModel } from '../../../products/data/models/view-models/product-detail.view-model';

export class GuestBasketModel {
  constructor(
    public products: { product: ProductDetailViewModel; count: number }[] = [],
    public totalCount: number = 0,
    public totalPrice: number = 0
  ) {}
}
