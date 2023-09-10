import { Injectable, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { AvailableStatusEnum } from './data/enums/available-status.enum';
import { ProductDetailViewModel } from './data/models/view-models/product-detail.view-model';

@Injectable()
export class ProductService implements OnDestroy {
  constructor() {}
  destroy$ = new Subject<void>();

  productUrl: string = '';

  getProductStatus(productDetail: ProductDetailViewModel): AvailableStatusEnum {
    if (productDetail.currentStock > 0 && productDetail.currentPrice > 0) {
      return AvailableStatusEnum.AVAILABLE;
    }
    if (productDetail.currentStock <= 0) {
      return AvailableStatusEnum.UNAVAILABLE;
    }
    return AvailableStatusEnum.NOPRICE;
  }
  ngOnDestroy(): void {}
}
