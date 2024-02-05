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
import { PackageItemsViewModel } from '../data/models/view-models/package-items.view-model';
import { BasketItemViewModel } from '../../checkout/data/models/basket-item.view-model';
import { ProductSpecificViewModel } from '../data/models/view-models/product-specific.view-model';
import { AddToCartDto } from '../../checkout/data/dto/add-to-cart.dto';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { UpdateBasketDto } from '../../checkout/data/dto/update-basket.dto';
import { PackageProductsDialogComponent } from '../product-details/components/package-products-dialog/package-products-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SellerViewModel } from '../product-details/components/stores/seller.view-model';
import { OptionPriceDto } from '../data/models/dto/option-price.dto';
import { OptionPriceViewModel } from '../data/models/view-models/option-price.view-model';

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

  sellers$ = new BehaviorSubject<SellerViewModel[]>([]);
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

  getPackageData(sellerId: number) {
    const productDetails = this.productDetails$.value!;
    this._loadingService.startLoading('read', 'packageItems');
    const basketCount = this.basketCount(sellerId);
    if (basketCount > 0) {
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
          error: () => this._loadingService.stopLoading('read', 'packageItems'),
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
          error: () => this._loadingService.stopLoading('read', 'packageItems'),
        });
    }
  }

  openPackageDetailDialog(data: PackageItemsViewModel) {
    const sellers = this.sellers$.value;
    const dialogRef = this._dialog.open(PackageProductsDialogComponent, {
      width: '500px',
      autoFocus: false,
      data: data,
    });
    dialogRef.componentInstance.dialogSubmit
      .pipe(
        takeUntil(this.destroy$),
        switchMap((result: PackageItemsViewModel) => {
          return of(
            sellers[0].inBasketCount > 0
              ? this.updateBasket(1, sellers[0])
              : this.addToBasket(sellers[0])
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

  updateBasket(count: number, seller?: SellerViewModel) {
    const sellers = this.sellers$.value;
    if (!seller) seller = sellers[0];
    const productDetails = this.productDetails$.value!;

    const dto = {
      productId: seller.productId,
      storeId: seller.id,
      packageDetailItems: this._mapPackageItems,

      count,
    } as UpdateBasketDto;
    const result = this._basketService.updateBasket(dto);
    if (result) this._updateStoreInBasketCount(seller.id, count);
    return result;
  }

  addToBasket(seller?: SellerViewModel) {
    const sellers = this.sellers$.value;
    if (!seller) seller = sellers[0];
    const result = this.isLoggedIn
      ? this.addToBasketAuthorized(seller.id, seller.productId)
      : this.addToBasketGuest(seller);
    if (result) this._updateStoreInBasketCount(seller.id, 1);
    return result;
  }

  private _updateStoreInBasketCount(storeId: number, count: number) {
    const sellers = this.sellers$.value;
    const store = sellers.find((x) => x.id == storeId);
    if (store) store.inBasketCount = count;
  }

  addToBasketGuest(seller: SellerViewModel) {
    const productDetails = this.productDetails$.value!;
    const productItem = {
      product: {
        id: seller.productId,
        priceAfterDiscount: seller.priceAfterDiscount,
        name: productDetails.name,
        thumbnailImage: productDetails.image,
        discount: seller.discountPercent,
        price: seller.price,
        currentStock: seller.currentStock,
        seller: { id: seller.id, name: seller.title },
        details: this._mapPackageItems,
      },
      url: this.productUrl,

      count: 1,
    } as BasketItemViewModel;
    return this._basketService.addToBasket({ guestBasketItem: productItem });
  }

  public initialSellers() {
    const productDetails = this.productDetails$.value!;
    this._basketService.inBasketCount(productDetails.id).then((res) => {
      const kelemanStore = new SellerViewModel(
        'فروشگاه کلمان',
        0,
        productDetails.currentPrice,
        productDetails.currentDiscountPercent,
        productDetails.priceAfterDiscount,
        productDetails.currentStock,
        0,
        productDetails.id
      );
      const sellerArray = [kelemanStore, ...productDetails.stores].map((x) => {
        return {
          ...x,
          inBasketCount: res.find((y) => y.storeId === x.id)?.count! || 0,
        };
      });
      this.sellers$.next(sellerArray);
    });
  }

  public basketCount(sellerId: number) {
    const sellers = this.sellers$.value;
    return sellers.find((x) => x.id === sellerId)?.inBasketCount || 0;
  }

  addToBasketAuthorized(storeId: number, productId: number) {
    const dto: AddToCartDto = {
      productId: productId,
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

  getPriceOptions(optionPricesDto: OptionPriceDto[]) {
    this._loadingService.startLoading('read', 'priceOptions');
    this._productRepository
      .optionPrice(optionPricesDto)
      .pipe(
        tap(() => this._loadingService.stopLoading('read', 'priceOptions')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => this._updateStorePrices(result.result!),
        error: () => this._loadingService.stopLoading('read', 'priceOptions'),
      });
  }

  private _updateStorePrices(optionPrices: OptionPriceViewModel[]) {
    const sellers = this.sellers$.value;
    const updatedSellers: SellerViewModel[] = [];
    optionPrices.forEach((op) => {
      let seller = sellers.find((x) => x.id === op.storeId);
      if (seller) {
        seller = {
          ...seller,
          price: op.price,
          currentStock: op.currentStock,
          priceAfterDiscount: op.priceAfterDiscount,
          discountPercent: op.discountPercent,
          productId: op.productId,
        };
        updatedSellers.push(seller);
      }
    });

    this.sellers$.next([...updatedSellers]);
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
