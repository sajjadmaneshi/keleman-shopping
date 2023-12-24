export interface VerifyPaymentDto {
  bankId: number;
  bankGateWayId: string;
  status: string;
  referenceId?: string;
}
