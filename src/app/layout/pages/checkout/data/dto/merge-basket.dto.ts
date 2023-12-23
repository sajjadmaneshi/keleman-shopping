export class MergeBasketDto {
  constructor(
    public productId: number,
    public count: number,
    public storeId?: number
  ) {}
}
