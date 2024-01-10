export class SellerViewModel {
  constructor(
    public title: string,
    public id: number,
    public price: number,
    public discountPercent: number,
    public priceAfterDiscount: number,
    public currentStock: number,
    public inBasketCount: number
  ) {}
}
