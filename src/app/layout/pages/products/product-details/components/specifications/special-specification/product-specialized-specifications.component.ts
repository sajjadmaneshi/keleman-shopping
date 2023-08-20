import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../../../../product.service';
import { ProductRepository } from '../../../../data/repositories/product.repository';
import { ProductSpecificViewModel } from '../../../../data/models/view-models/product-specific.view-model';
import { Subscription, tap } from 'rxjs';

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
  isLoading = true;
  constructor(
    private _productService: ProductService,
    private _productRepository: ProductRepository
  ) {
    this._getProductSpecification();
  }

  leftColumnData!: ProductSpecificViewModel[];
  rightColumnData!: ProductSpecificViewModel[];

  subscription!: Subscription;

  private _getProductSpecification() {
    this.subscription = this._productRepository
      .getProductSpecifics(this._productService.productUrl)
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe((result) => {
        this._separateSpecification([...result.result!]);
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
    this.subscription.unsubscribe();
  }
}
