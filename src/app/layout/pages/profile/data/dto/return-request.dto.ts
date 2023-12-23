export interface ReturnRequestDto {
  billId: number;
  selectedReasonId: number;
  products: [
    {
      amount: number;
      productId: number;
    }
  ];
  description: string;
}
