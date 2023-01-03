export interface ProductItemModel {
  image: string;
  name: string;

  description?: string;
  price?: number | null;

  off?: number | null;
  priceWithOff?: number | null;
}
