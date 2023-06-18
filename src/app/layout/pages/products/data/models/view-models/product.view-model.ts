export interface ProductViewModel {
  id: number;
  name: string;
  thumbnailImage: string;
  price: number;
  rate: number;
  priceAfterOff: number;
  description: string;
  discount: number;
  category: {
    id: number;
    name: string;
  };
}
