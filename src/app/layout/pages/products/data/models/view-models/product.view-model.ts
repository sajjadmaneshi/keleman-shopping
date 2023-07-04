export interface ProductViewModel {
  id: number;
  name: string;
  thumbnailImage: string;
  price: number;
  rate: number;
  priceAfterDiscount: number;
  description: string;
  discount: number;
  brand: string;
  category: {
    id: number;
    name: string;
  };
}
