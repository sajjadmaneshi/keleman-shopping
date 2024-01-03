import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ProductService,
  ProductStatusViewModel,
} from '../../../services/product.service';
import { ProductRepository } from '../../../data/repositories/product.repository';
import { Subject, takeUntil, tap } from 'rxjs';
import { ProductSpecificViewModel } from '../../../data/models/view-models/product-specific.view-model';
import { SharedVariablesService } from '../../../../../../shared/services/shared-variables.service';
import { ProductDetailViewModel } from '../../../data/models/view-models/product-detail.view-model';
import { AddToCartDto } from '../../../../checkout/data/dto/add-to-cart.dto';
import { UpdateBasketDto } from '../../../../checkout/data/dto/update-basket.dto';
import { LoadingService } from '../../../../../../../common/services/loading.service';
import { BasketItemViewModel } from '../../../../checkout/data/models/basket-item.view-model';
import { MatDialog } from '@angular/material/dialog';
import { PackageProductsDialogComponent } from '../package-products-dialog/package-products-dialog.component';
import { PackageItemsViewModel } from '../../../data/models/view-models/package-items.view-model';
import { BasketService } from '../../../../checkout/services/basket.service';

@Component({
  selector: 'keleman-product-meta',
  templateUrl: './product-meta.component.html',
  styleUrls: ['./product-meta.component.scss'],
})
export class ProductMetaComponent implements OnInit, OnDestroy {
  @Input() isLoggedIn = false;
  @Input() productDetails!: ProductDetailViewModel;

  specifications!: ProductSpecificViewModel[];
  addToBasketLoading = false;
  isInBasket = false;
  inBasketCount = 0;
  destroy$ = new Subject<void>();
  packageItems!: PackageItemsViewModel;
  productValidationStatus!: ProductStatusViewModel;

  constructor(
    private readonly _productService: ProductService,
    private readonly _productRepository: ProductRepository,
    private readonly _basketService: BasketService,
    private readonly _dialog: MatDialog,
    public readonly loadingService: LoadingService,
    public readonly sharedVariableService: SharedVariablesService
  ) {
    this._getProductSpecification();
    this._basketService.productCountInBasket$
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.inBasketCount = result;
      });
  }

  ngOnInit(): void {
    if (this.productDetails) {
      this.updateInBasketCount();
      this.productValidationStatus =
        this._productService.checkProductValidation(this.productDetails);
    }
  }

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
        next: (result) => {
          this.specifications = [...result.result!];
        },
        error: () =>
          this.loadingService.stopLoading('read', 'productSpecification'),
      });
  }

  addToBasket() {
    this.isLoggedIn ? this.addToBasketAuthorized() : this.addToBasketGuest();
  }

  addToBasketGuest() {
    const productItem = {
      product: {
        id: this.productDetails.id,
        priceAfterDiscount: this.productDetails.currentPrice,
        name: this.productDetails.name,
        thumbnailImage: this.productDetails.image,
        discount: 0,
        price: this.productDetails.currentPrice,
        seller: this.productDetails.seller.name,
        currentStock: this.productDetails.currentStock,
      },
      count: 1,
    } as BasketItemViewModel;
    this._basketService.addToBasket({ guestBasketItem: productItem });
  }

  addToBasketAuthorized() {
    const dto = {
      productId: this.productDetails.id,
      // storeId: this.productDetail.stores[0].id,
      packageDetailItems: this.packageItems
        ? this.packageItems.items
            .map((x) => {
              return x.items.map((y) => {
                return { id: y.productId, count: y.amount };
              });
            })
            .flat(Infinity)
        : undefined,
    } as AddToCartDto;

    this._basketService.addToBasket({ authBasketItem: dto });
  }

  updateBasket(count: number) {
    const dto = {
      productId: this.productDetails.id,
      // storeId: this.productDetail.stores[0].id,
      count,
    } as UpdateBasketDto;
    this._basketService.updateBasket(dto);
  }

  openPackageDetailDialog(data: PackageItemsViewModel) {
    this._dialog
      .open(PackageProductsDialogComponent, {
        width: '500px',
        autoFocus: false,
        data: this.packageItems || data,
      })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: PackageItemsViewModel) => {
        this.packageItems = result;
      });
  }

  getPackageData() {
    this.loadingService.startLoading('read', 'packageItems');
    this._productRepository
      .getPackageDetails(this.productDetails.id)
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'packageItems')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => {
          this.openPackageDetailDialog(result.result!);
        },
        error: () => this.loadingService.stopLoading('read', 'packageItems'),
      });
  }

  private updateInBasketCount(): void {
    this._basketService.inBasketCount(this.productDetails.id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
