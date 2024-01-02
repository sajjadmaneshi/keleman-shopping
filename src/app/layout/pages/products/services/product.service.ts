import { Injectable, OnDestroy } from '@angular/core';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { AvailableStatusEnum } from '../data/enums/available-status.enum';
import { ProductDetailViewModel } from '../data/models/view-models/product-detail.view-model';
import { ProductRepository } from '../data/repositories/product.repository';
import { ProductDescriptionsViewModel } from '../data/models/view-models/product-descriptions.view-model';
import { ProductViewModel } from '../data/models/view-models/product.view-model';
import { LoadingService } from '../../../../../common/services/loading.service';

@Injectable()
export class ProductService implements OnDestroy {
  destroy$ = new Subject<void>();
  productUrl: string = '';
  productDescriptions = new Subject<ProductDescriptionsViewModel>();
  relatedProducts = new Subject<ProductViewModel[]>();

  constructor(
    private _productRepository: ProductRepository,
    private readonly _loadingService: LoadingService
  ) {}

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
    this._loadingService.startLoading('read', 'productDescription');
    this._productRepository
      .getProductDescription(this.productUrl)
      .pipe(
        tap(() =>
          this._loadingService.stopLoading('read', 'productDescription')
        ),
        takeUntil(this.destroy$),
        map((result) => result.result!)
      )
      .subscribe({
        next: (peoductDescroption) =>
          this.productDescriptions.next(peoductDescroption),
        error: () =>
          this._loadingService.stopLoading('read', 'productDescription'),
      });
  }

  getRelatedProducts() {
    this._loadingService.startLoading('read', 'relatedProducts');
    this._productRepository
      .getRelated(this.productUrl)
      .pipe(
        tap(() => this._loadingService.stopLoading('read', 'relatedProducts')),
        takeUntil(this.destroy$),
        map((result) => result.result!)
      )
      .subscribe({
        next: (relatedProducts) => this.relatedProducts.next(relatedProducts),
        error: () =>
          this._loadingService.stopLoading('read', 'relatedProducts'),
      });
  }

  public checkProductValidation(productDetails: ProductDetailViewModel) {
    if (productDetails.currentStock === 0)
      return new ProductStatusViewModel(
        'ناموجود',
        AvailableStatusEnum.UNAVAILABLE,
        true
      );
    if (productDetails.currentPrice === 0)
      return new ProductStatusViewModel(
        'تماس بگیرید',
        AvailableStatusEnum.NOPRICE,
        true
      );
    return new ProductStatusViewModel(
      'افزودن به سبد خرید',
      AvailableStatusEnum.AVAILABLE
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

export class ProductStatusViewModel {
  constructor(
    public text: string,
    public status: AvailableStatusEnum,
    public disable = false
  ) {}
}
