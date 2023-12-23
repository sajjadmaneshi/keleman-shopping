export interface OrderCanReturnViewModel {
  id: 0;
  isPaid: true;
  date: string;
  products: ReturnOrderProductViewModel[];
}

export interface ReturnOrderProductViewModel {
  id: number;
  amount: number;
  name: string;
  store: string;
  brand: string;
  url: string;
  thumbnailImage: string;
}
