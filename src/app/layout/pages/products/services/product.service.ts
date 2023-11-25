import { Injectable, OnDestroy } from '@angular/core';

import { map, Subject, takeUntil, tap } from 'rxjs';
import { AvailableStatusEnum } from '../data/enums/available-status.enum';
import { ProductDetailViewModel } from '../data/models/view-models/product-detail.view-model';
import { ProductRepository } from '../data/repositories/product.repository';
import { ProductDescriptionsViewModel } from '../data/models/view-models/product-descriptions.view-model';
import { ProductViewModel } from '../data/models/view-models/product.view-model';

@Injectable()
export class ProductService implements OnDestroy {
  isLoading = true;

  destroy$ = new Subject<void>();

  productUrl: string = '';
  productDescriptions = new Subject<ProductDescriptionsViewModel>();

  relatedProducts = new Subject<ProductViewModel[]>();

  constructor(private _productRepository: ProductRepository) {}

  getProductStatus(productDetail: ProductDetailViewModel): AvailableStatusEnum {
    if (productDetail.currentStock > 0 && productDetail.currentPrice > 0) {
      return AvailableStatusEnum.AVAILABLE;
    }
    if (productDetail.currentStock <= 0) {
      return AvailableStatusEnum.UNAVAILABLE;
    }
    return AvailableStatusEnum.NOPRICE;
  }

  getProductDescriptions() {
    this._productRepository
      .getProductDescription(this.productUrl)
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$),
        map((result) => result.result!)
      )
      .subscribe((peoductDescroption) =>
        this.productDescriptions.next(peoductDescroption)
      );
  }

  getRelatedProducts() {
    this._productRepository
      .getRelated(this.productUrl)
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$),
        map((result) => result.result!)
      )
      .subscribe((relatedProducts) =>
        this.relatedProducts.next(relatedProducts)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
