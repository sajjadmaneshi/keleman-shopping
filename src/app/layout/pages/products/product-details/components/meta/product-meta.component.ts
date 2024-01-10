import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ProductService,
  ProductStatusViewModel,
} from '../../../services/product.service';

import { Subject, takeUntil } from 'rxjs';
import { ProductSpecificViewModel } from '../../../data/models/view-models/product-specific.view-model';
import { SharedVariablesService } from '../../../../../../shared/services/shared-variables.service';
import { ProductDetailViewModel } from '../../../data/models/view-models/product-detail.view-model';
import { LoadingService } from '../../../../../../../common/services/loading.service';
import { PackageItemsViewModel } from '../../../data/models/view-models/package-items.view-model';
import { BasketService } from '../../../../checkout/services/basket.service';

@Component({
  selector: 'keleman-product-meta',
  templateUrl: './product-meta.component.html',
  styleUrls: ['./product-meta.component.scss'],
})
export class ProductMetaComponent implements OnInit, OnDestroy {
  productDetails!: ProductDetailViewModel;

  specifications: ProductSpecificViewModel[] = [];
  addToBasketLoading = false;
  isInBasket = false;
  inBasketCount = 0;
  destroy$ = new Subject<void>();
  packageItems!: PackageItemsViewModel;
  productValidationStatus!: ProductStatusViewModel;

  constructor(
    private readonly _basketService: BasketService,
    public readonly productService: ProductService,
    public readonly loadingService: LoadingService,
    public readonly sharedVariableService: SharedVariablesService
  ) {
    this._basketService.productCountInBasket$
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.inBasketCount = result;
      });
    this.productService.productDetails$.subscribe((produltDetail) => {
      this.productDetails = produltDetail!;
    });
    this.productService.packageItems$.subscribe((result) => {
      if (result) {
        this.productService.openPackageDetailDialog(result, this.inBasketCount);
      }
    });
  }

  ngOnInit(): void {
    if (this.productDetails) {
      this.updateInBasketCount();
      this.productValidationStatus = this.productService.checkProductValidation(
        this.productDetails
      );
    }
  }

  private updateInBasketCount(): void {
    this._basketService.inBasketCount(this.productDetails.id, 0);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
