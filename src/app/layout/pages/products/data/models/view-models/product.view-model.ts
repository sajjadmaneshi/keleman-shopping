export interface ProductViewModel {
  id: number;
  name: string;
  price: number;
  rate: RateViewModel;
  description: string;
  Introduction: string;

  deliveryDesc: string;
  defaultPic: string;
}

export interface RateViewModel {
  count: number;
  average: number;
}
