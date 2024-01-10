export interface PackageItemsViewModel {
  name: string;
  items: PackageItemGroupViewModel[];
  totalPrice: number;
}
export interface PackageItemGroupViewModel {
  id: number;
  caption: string;
  minValue: number;
  isSameValue: boolean;
  items: PackegeItemViewModel[];
}
export class PackegeItemViewModel {
  constructor(
    public productId: number,
    public caption: string,
    public amount: number,
    public price: number,
    public priceAfterDiscount: number,
    public image: string,
    public currentStock: number,
    public discountPercent: number,
    public canDecrease: boolean = false
  ) {}
}
