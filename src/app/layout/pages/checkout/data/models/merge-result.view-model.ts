import { MergeStatusEnum } from '../merge-status.enum';

export interface MergeResultViewModel {
  status: MergeStatusEnum;
  productId: number;
  storeId: number;
  count: number;
}
