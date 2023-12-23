export class BasketCheckoutViewModel {
  constructor(
    public totalPrice: number,
    public payablePrice: number,
    public totalDiscount: number = 0,
    public profit: number
  ) {}
}
