export interface BasketItemViewModel {
  id?: number;
  product: {
    id: number;
    name: string;
    thumbnailImage: string;
    seller: {
      id: number;
      name: string;
    };
    price: number;
    priceAfterDiscount: number;
    discount: number;
    currentStock: number;
    details?: BasketPackageItemsViewModel[];
  };
  count: number;
  reciveTime?: string;
  url: string;
}

export interface BasketPackageItemsViewModel {
  id: number;
  name: string;
  count: number;
}
