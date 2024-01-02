export interface OrderViewModel {
  id: number;
  price: number;
  priceAfterDiscount: number;
  discount: number;
  address: string;
  isPaid: boolean;
  date: string;
  products: OrderProduct[];
}

export interface OrderProduct {
  id: number;
  amount: number;
  name: string;
  store: string;
  brand: string;

  url: string;
  thumbnailImage: string;
}
