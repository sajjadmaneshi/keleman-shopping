import { ReturnRequestStatusEnum } from '../enums/return-request-status.enum';

export interface ReturnRequestViewModel {
  id: number;
  billId: number;
  description: string;
  dateTime: string;
  status: ReturnRequestStatusEnum;
  adminDescription: string;
}
