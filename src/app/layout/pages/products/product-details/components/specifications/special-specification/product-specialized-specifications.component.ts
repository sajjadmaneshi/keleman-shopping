import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { ProductRepository } from '../../../../data/repositories/product.repository';
import { ProductSpecificViewModel } from '../../../../data/models/view-models/product-specific.view-model';
import { Subject, Subscription, takeUntil, tap } from 'rxjs';
import { LoadingService } from '../../../../../../../../common/services/loading.service';

@Component({
  selector: 'keleman-product-specialization',
  templateUrl: './product-specialized-specifications.component.html',
  styles: [
    `
      .product-details-check {
        width: 100%;
      }
      .product-checking {
        min-height: 100%;
        overflow: auto;
      }
      .details {
        margin: 0 auto;
        max-width: 900px;
      }
    `,
  ],
})
export class ProductSpecializedSpecificationsComponent implements OnDestroy {
  destroy$ = new Subject<void>();

  constructor(
    private readonly _productService: ProductService,
    private readonly _productRepository: ProductRepository,
    public readonly loadingService: LoadingService
  ) {
    this._getProductSpecification();
  }

  leftColumnData!: ProductSpecificViewModel[];
  rightColumnData!: ProductSpecificViewModel[];

  subscription!: Subscription;

  private _getProductSpecification() {
    this.loadingService.startLoading('read', 'productSpecification');
    this._productRepository
      .getProductSpecifics(this._productService.productUrl)
      .pipe(
        tap(() =>
          this.loadingService.stopLoading('read', 'productSpecification')
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => this._separateSpecification([...result.result!]),
        error: () =>
          this.loadingService.stopLoading('read', 'productSpecification'),
      });
  }

  private _separateSpecification(specifications: ProductSpecificViewModel[]) {
    this.leftColumnData = specifications.slice(
      0,
      Math.ceil(specifications.length / 2)
    );
    this.rightColumnData = specifications.slice(
      Math.ceil(specifications.length / 2)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
