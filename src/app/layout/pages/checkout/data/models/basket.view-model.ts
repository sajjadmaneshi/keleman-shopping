export interface BasketViewModel {
  cart: {
    id: number;
    items_count: number;
    payable_price: number;
    totalPrice: number;
    items_discount: number;
    total_discount: number;
  } | null;
  cart_items: CartItemViewModel[] | null;
}

export interface CartItemViewModel {
  id: number;
  cart_id: number;
  quantity: number;
  storeName: string;
  price: {
    sellingPrice: number;
    price: number;
    discount: number;
    discountPercent: number;
  };
  product: {
    id: number;
    title_fa: string;
    data_layer: {
      brand: string;
      category: string;
    };
    product_type: string;
    imageUrl: string;
  };
}
