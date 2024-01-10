import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  map,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { AvailableStatusEnum } from '../data/enums/available-status.enum';
import { ProductDetailViewModel } from '../data/models/view-models/product-detail.view-model';
import { ProductRepository } from '../data/repositories/product.repository';
import { ProductDescriptionsViewModel } from '../data/models/view-models/product-descriptions.view-model';
import { ProductViewModel } from '../data/models/view-models/product.view-model';
import { LoadingService } from '../../../../../common/services/loading.service';
import { BasketService } from '../../checkout/services/basket.service';
import {
  PackageItemsViewModel,
  PackageItemGroupViewModel,
} from '../data/models/view-models/package-items.view-model';
import { BasketItemViewModel } from '../../checkout/data/models/basket-item.view-model';
import { ProductSpecificViewModel } from '../data/models/view-models/product-specific.view-model';
import { AddToCartDto } from '../../checkout/data/dto/add-to-cart.dto';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { UpdateBasketDto } from '../../checkout/data/dto/update-basket.dto';
import { PackageProductsDialogComponent } from '../product-details/components/package-products-dialog/package-products-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class ProductService implements OnDestroy {
  destroy$ = new Subject<void>();
  productUrl: string = '';
  productDescriptions = new Subject<ProductDescriptionsViewModel>();
  relatedProducts = new Subject<ProductViewModel[]>();
  productSpecification = new Subject<ProductSpecificViewModel[]>();
  productDetails$ = new BehaviorSubject<ProductDetailViewModel | undefined>(
    undefined
  );
  packageItems$ = new BehaviorSubject<PackageItemsViewModel | undefined>(
    undefined
  );
  isLoggedIn = false;
  constructor(
    private _productRepository: ProductRepository,
    private _basketService: BasketService,
    private readonly _authService: AuthService,
    private readonly _loadingService: LoadingService,
    private readonly _dialog: MatDialog
  ) {
    this._authService.isLoggedIn$.subscribe((result) => {
      this.isLoggedIn = result;
    });
  }

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

  public getProductDetails() {
    this._productRepository
      .getProductDetails(this.productUrl)
      .pipe(
        tap(() => this._loadingService.stopLoading('read', 'productDetails')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => this.productDetails$.next(result.result!),

        error: () => this._loadingService.stopLoading('read', 'productDetails'),
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

  getPackageData(inBasketCount: number) {
    const productDetails = this.productDetails$.value!;
    this._loadingService.startLoading('read', 'packageItems');
    if (inBasketCount > 0 && this.isLoggedIn) {
      this._basketService
        .getPackageDetails(productDetails.id)
        .pipe(
          tap(() => this._loadingService.stopLoading('read', 'packageItems')),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (result) => {
            this.packageItems$.next(result!);
          },
          error: () => {
            this._loadingService.stopLoading('read', 'packageItems');
          },
        });
    } else {
      this._productRepository
        .getPackageDetails(productDetails.id)
        .pipe(
          tap(() => this._loadingService.stopLoading('read', 'packageItems')),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (result) => {
            this.packageItems$.next(result.result!);
          },
          error: () => {
            this._loadingService.stopLoading('read', 'packageItems');
          },
        });
    }
  }

  openPackageDetailDialog(data: PackageItemsViewModel, inBasketCount: number) {
    const packageItems = this.packageItems$.value;
    const dialogRef = this._dialog.open(PackageProductsDialogComponent, {
      width: '500px',
      autoFocus: false,
      data: packageItems || data,
    });
    dialogRef.componentInstance.dialogSubmit
      .pipe(
        takeUntil(this.destroy$),
        switchMap((result: PackageItemsViewModel) => {
          this.packageItems$.next(result);
          return of(
            inBasketCount > 0 ? this.updateBasket(1, 0) : this.addToBasket(0)
          );
        })
      )
      .subscribe((response: boolean) => {
        if (response) {
          dialogRef.close();
        }
      });
  }

  getProductSpecification() {
    this._loadingService.startLoading('read', 'productSpecification');
    this._productRepository
      .getProductSpecifics(this.productUrl)
      .pipe(
        tap(() =>
          this._loadingService.stopLoading('read', 'productSpecification')
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => {
          this.productSpecification.next([...result.result!]);
        },
        error: () =>
          this._loadingService.stopLoading('read', 'productSpecification'),
      });
  }

  updateBasket(count: number, storeId: number) {
    const productDetails = this.productDetails$.value!;

    const dto = {
      productId: productDetails.id,
      storeId,
      packageDetailItems: this._mapPackageItems,

      count,
    } as UpdateBasketDto;
    return this._basketService.updateBasket(dto);
  }

  addToBasket(storeId: number) {
    return this.isLoggedIn
      ? this.addToBasketAuthorized(storeId)
      : this.addToBasketGuest();
  }

  addToBasketGuest() {
    const productDetails = this.productDetails$.value!;
    const productItem = {
      product: {
        id: productDetails.id,
        priceAfterDiscount: productDetails.currentPrice,
        name: productDetails.name,
        thumbnailImage: productDetails.image,
        discount: productDetails.currentDiscountPercent,
        price: productDetails.currentPrice,
        currentStock: productDetails.currentStock,
        details: this._mapPackageItems,
      },

      count: 1,
    } as BasketItemViewModel;
    return this._basketService.addToBasket({ guestBasketItem: productItem });
  }

  addToBasketAuthorized(storeId: number) {
    const productDetails = this.productDetails$.value!;
    const dto = {
      productId: productDetails.id,
      storeId,
      packageDetailItems: this._mapPackageItems,
    } as AddToCartDto;

    return this._basketService.addToBasket({ authBasketItem: dto });
  }

  private get _mapPackageItems() {
    const packageItems = this.packageItems$.value;
    return packageItems
      ? packageItems.items
          .map((x) => {
            return x.items.map((y) => {
              return { id: y.productId, count: y.amount };
            });
          })
          .flat(Infinity)
      : undefined;
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
