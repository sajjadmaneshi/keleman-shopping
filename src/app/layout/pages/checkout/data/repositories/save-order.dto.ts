export class SaveOrderDto {
  constructor(
    public addressId: number,
    public discountCode: string,
    public paymentGatewayId: number,
    public description: string,
    public billId: number
  ) {}
}
