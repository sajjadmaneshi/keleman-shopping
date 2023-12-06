import { AddToCartDto } from './add-to-cart.dto';

export interface UpdateBasketDto extends AddToCartDto {
  count: number;
}
