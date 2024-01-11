import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ProductService,
  ProductStatusViewModel,
} from '../../../services/product.service';
import { Subject } from 'rxjs';
import { ProductSpecificViewModel } from '../../../data/models/view-models/product-specific.view-model';
import { SharedVariablesService } from '../../../../../../shared/services/shared-variables.service';
import { ProductDetailViewModel } from '../../../data/models/view-models/product-detail.view-model';
import { LoadingService } from '../../../../../../../common/services/loading.service';
import { PackageItemsViewModel } from '../../../data/models/view-models/package-items.view-model';

@Component({
  selector: 'keleman-product-meta',
  templateUrl: './product-meta.component.html',
  styleUrls: ['./product-meta.component.scss'],
})
export class ProductMetaComponent implements OnInit, OnDestroy {
  productDetails!: ProductDetailViewModel;
  specifications: ProductSpecificViewModel[] = [];
  addToBasketLoading = false;
  destroy$ = new Subject<void>();
  packageItems!: PackageItemsViewModel;
  productValidationStatus!: ProductStatusViewModel;

  constructor(
    public readonly productService: ProductService,
    public readonly loadingService: LoadingService,
    public readonly sharedVariableService: SharedVariablesService
  ) {
    this.productService.productDetails$.subscribe((produltDetail) => {
      this.productDetails = produltDetail!;
    });
    this.productService.packageItems$.subscribe((result) => {
      if (result) {
        this.productService.openPackageDetailDialog(result);
      }
    });
  }

  ngOnInit(): void {
    if (this.productDetails) {
      this.productValidationStatus = this.productService.checkProductValidation(
        this.productDetails
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
