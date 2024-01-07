import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductDetailViewModel } from '../data/models/view-models/product-detail.view-model';
import { ProductRepository } from '../data/repositories/product.repository';
import { of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import {
  ProductService,
  ProductStatusViewModel,
} from '../services/product.service';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { ModifyMetaDataService } from '../../../../../common/services/modify-meta-data.service';
import { BasketItemViewModel } from '../../checkout/data/models/basket-item.view-model';
import { AddToCartDto } from '../../checkout/data/dto/add-to-cart.dto';
import { UpdateBasketDto } from '../../checkout/data/dto/update-basket.dto';
import { BasketService } from '../../checkout/services/basket.service';
import { LoadingService } from '../../../../../common/services/loading.service';
import { HttpClientResult } from '../../../../shared/data/models/http/http-client.result';
import { PackageItemsViewModel } from '../data/models/view-models/package-items.view-model';
import { PackageProductsDialogComponent } from './components/package-products-dialog/package-products-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AvailableStatusEnum } from '../data/enums/available-status.enum';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [ModifyMetaDataService],
})
export class ProductDetailsComponent implements OnInit {
  productDetails!: ProductDetailViewModel;
  isInBasket = false;
  inBasketCount: number = 0;
  isLoggedIn = false;
  productValidationStatus!: ProductStatusViewModel;
  availableStatusEnum = AvailableStatusEnum;
  packageItems!: PackageItemsViewModel;
  private destroy$ = new Subject<void>();
  constructor(
    public readonly applicationState: ApplicationStateService,
    public readonly loadingService: LoadingService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _productRepository: ProductRepository,
    private readonly _productService: ProductService,
    private readonly _authService: AuthService,
    private readonly _basketService: BasketService,
    private readonly _metaDataService: ModifyMetaDataService,
    private readonly _dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document
  ) {
    loadingService.startLoading('read', 'productDetails');

    this._authService.isLoggedIn$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.isLoggedIn = res));

    this._basketService.productCountInBasket$.subscribe((result) => {
      this.inBasketCount = result;
    });
    this._getDataFromUrl();
  }

  private _getDataFromUrl(): void {
    this._activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        this._productService.productUrl = params['url'];
      });
  }

  ngOnInit() {
    this._getProductDetails();
    this._productService.getRelatedProducts();
  }

  private _getProductDetails() {
    this._productRepository
      .getProductDetails(this._productService.productUrl)
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'productDetails')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => this._handleSuccessRequest(result),

        error: () => this.loadingService.stopLoading('read', 'productDetails'),
      });
  }

  private _handleSuccessRequest(
    response: HttpClientResult<ProductDetailViewModel>
  ) {
    this.productDetails = response.result!;
    this._metaDataService.setMetaData(
      this.productDetails.seoTitle,
      this.productDetails.seoDescription
    );
    this.productValidationStatus = this._productService.checkProductValidation(
      this.productDetails
    );
    this.checkBasketStatus();
  }

  getPackageData() {
    this._productService
      .getPackageData(
        this.productDetails.id,
        this.inBasketCount,
        this.isLoggedIn
      )
      .then((result) => {
        if (result) this.openPackageDetailDialog(result);
      });
  }

  openPackageDetailDialog(data: PackageItemsViewModel) {
    const dialogRef = this._dialog.open(PackageProductsDialogComponent, {
      width: '500px',
      autoFocus: false,
      data: this.packageItems || data,
    });
    dialogRef.componentInstance.dialogSubmit
      .pipe(
        takeUntil(this.destroy$),
        switchMap((result: PackageItemsViewModel) => {
          this.packageItems = result;
          return of(
            this.inBasketCount > 0 ? this.updateBasket(1) : this.addToBasket()
          );
        })
      )
      .subscribe((response: boolean) => {
        if (response) {
          dialogRef.close();
        }
      });
  }

  private checkBasketStatus() {
    if (this.productDetails) {
      this._basketService.inBasketCount(this.productDetails.id);
    }
  }

  @HostListener('mousewheel', ['$event'])
  onScroll() {
    const productDetailsNavbar = this.document.querySelector(
      '.product-details-navbar'
    )!;

    (productDetailsNavbar as HTMLElement).offsetTop > 700
      ? productDetailsNavbar.classList.add('add-shadow')
      : productDetailsNavbar.classList.remove('add-shadow');
  }

  addToBasket() {
    return this.isLoggedIn
      ? this.addToBasketAuthorized()
      : this.addToBasketGuest();
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
        details: this.packageItems
          ? this.packageItems.items
              .map((x) => {
                return x.items.map((y) => {
                  return { id: y.productId, count: y.amount, name: y.caption };
                });
              })
              .flat(Infinity)
          : undefined,
      },

      count: 1,
    } as BasketItemViewModel;
    return this._basketService.addToBasket({ guestBasketItem: productItem });
  }

  addToBasketAuthorized() {
    const dto = {
      productId: this.productDetails.id,
      // storeId: this.productDetails.stores[0]?.id!,
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

    return this._basketService.addToBasket({ authBasketItem: dto });
  }

  updateBasket(count: number) {
    const dto = {
      productId: this.productDetails.id,
      // storeId: this.productDetails.stores[0]?.id!,
      packageDetailItems: this.packageItems
        ? this.packageItems.items
            .map((x) => {
              return x.items.map((y) => {
                return { id: y.productId, count: y.amount };
              });
            })
            .flat(Infinity)
        : undefined,
      count,
    } as UpdateBasketDto;
    return this._basketService.updateBasket(dto);
  }
}
