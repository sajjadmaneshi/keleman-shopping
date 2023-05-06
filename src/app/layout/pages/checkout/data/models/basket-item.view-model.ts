export interface BasketItemViewModel {
  id: number;
  product: {
    image: string;
    name: string;
    seller: string;
    price: number;
    off: number;
    priceAfterOff: number;
  };
  count: number;
}
