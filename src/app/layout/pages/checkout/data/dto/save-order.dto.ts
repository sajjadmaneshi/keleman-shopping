export class SaveOrderDto {
  constructor(
    public discountCode: string,
    public paymentGatewayId: number,
    public description: string,
    public billId: number
  ) {}
}
