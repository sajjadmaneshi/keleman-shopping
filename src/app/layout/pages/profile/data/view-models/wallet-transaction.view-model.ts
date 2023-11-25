import { WalletTransactionStatusEnum } from '../enums/wallet-transaction-status.enum';

export interface WalletTransactionViewModel {
  id: number;
  billId: number;
  date: string;
  price: number;
  status: WalletTransactionStatusEnum;
  description: string;
}
