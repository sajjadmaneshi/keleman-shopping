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
import { SellerViewModel } from '../stores/seller.view-model';
import { GoToBasketDialogComponent } from '../go-to-basket/go-to-basket-dialog/go-to-basket-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  seller!: SellerViewModel;
  constructor(
    public readonly productService: ProductService,
    public readonly loadingService: LoadingService,
    public readonly sharedVariableService: SharedVariablesService,
    private readonly _dialog: MatDialog
  ) {
    this.productService.productDetails$
      .pipe(takeUntil(this.destroy$))
      .subscribe((produltDetail) => {
        this.productDetails = produltDetail!;
      });

    this.productService.sellers$.subscribe((result) => {
      this.seller = result[0];
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

  addToBasket() {
    const result = this.productService.addToBasket();
    if (result) {
      this._dialog.open(GoToBasketDialogComponent, {
        data: this.productDetails,
        minWidth: '500px',
      });
    }
  }

  ngOnDestroy(): void {
    this.productService.packageItems$.next(undefined);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
