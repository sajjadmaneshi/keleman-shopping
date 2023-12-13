export interface BasketItemViewModel {
  id: number;
  product: {
    id: number;
    name: string;
    thumbnailImage: string;
    seller: string;
    price: number;
    priceAfterDiscount: number;
    discount: number;
  };
  count: number;
  reciveTime: string;
}
