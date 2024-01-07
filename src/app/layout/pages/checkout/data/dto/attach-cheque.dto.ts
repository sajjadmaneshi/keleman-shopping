export interface AttachChequeDto {
  bankName: string;
  serial: string;
  date: string;
  amount: number;
  fullName: string;
  nationalCode: string;
  frontImage?: string;
  backImage?: string;
}
