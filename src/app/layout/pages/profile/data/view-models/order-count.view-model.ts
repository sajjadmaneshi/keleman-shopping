export class OrderCountViewModel {
  constructor(
    public currentCount: number = 0,
    public deliveredCount: number = 0,
    public returnedCount: number = 0,
    public cancelledCount: number = 0
  ) {}
}
