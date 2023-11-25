export interface AddToBasketDto {
  productId: number;
  storeId: number;
  packageDetailItems?: {
    id: 0;
    count: 0;
  };
  count: number;
}
