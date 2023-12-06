export interface AddToCartDto {
  productId: number;
  storeId?: number;
  packageDetailItems?: {
    id: number;
    count: number;
  };
}
