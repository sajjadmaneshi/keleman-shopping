import { WithdrawRequestStatusEnum } from '../enums/withdraw-request-status.enum';

export interface WithdrawRequestViewModel {
  id: number;
  price: number;
  status: WithdrawRequestStatusEnum;
  date: string;
}
