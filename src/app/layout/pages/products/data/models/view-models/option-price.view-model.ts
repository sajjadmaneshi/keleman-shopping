export class OptionPriceViewModel {
  constructor(
    public storeId: number,
    public productId: number,
    public price: number,
    public discountPercent: number,
    public priceAfterDiscount: number,
    public currentStock: number
  ) {}
}
