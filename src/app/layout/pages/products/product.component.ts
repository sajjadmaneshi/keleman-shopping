import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import {
  ProductService,
  ProductStatusViewModel,
} from './services/product.service';
import { ProductDetailViewModel } from './data/models/view-models/product-detail.view-model';
import { AvailableStatusEnum } from './data/enums/available-status.enum';
import { PackageItemsViewModel } from './data/models/view-models/package-items.view-model';

import { Subject, takeUntil } from 'rxjs';
import { ApplicationStateService } from '../../../shared/services/application-state.service';
import { LoadingService } from '../../../../common/services/loading.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { BasketService } from '../checkout/services/basket.service';
import { ModifyMetaDataService } from '../../../../common/services/modify-meta-data.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DOCUMENT } from '@angular/common';
import { take } from 'rxjs/operators';
import { BasketItemViewModel } from '../checkout/data/models/basket-item.view-model';
import { SellerViewModel } from './components/stores/seller.view-model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  providers: [ProductService, ModifyMetaDataService],
})
export class ProductComponent implements OnInit, OnDestroy {
  productDetails!: ProductDetailViewModel;
  isInBasket = false;
  inBasketCount: number = 0;
  isLoggedIn = false;
  productValidationStatus!: ProductStatusViewModel;
  availableStatusEnum = AvailableStatusEnum;
  packageItems!: PackageItemsViewModel;
  seller!: SellerViewModel;
  private destroy$ = new Subject<void>();

  constructor(
    public readonly applicationState: ApplicationStateService,
    public readonly loadingService: LoadingService,
    public readonly productService: ProductService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _authService: AuthService,
    private readonly _basketService: BasketService,
    private readonly _metaDataService: ModifyMetaDataService,
    private readonly _bottomSheet: MatBottomSheet,
    @Inject(DOCUMENT) private document: Document
  ) {
    loadingService.startLoading('read', 'productDetails');
    this._setupSubscription();
    this._getDataFromUrl();
    this.productService.sellers$
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.seller = result[0];
      });
  }

  private _setupSubscription() {
    this._authService.isLoggedIn$
      .pipe(take(1))
      .subscribe((res) => (this.isLoggedIn = res));
    this.productService.productDetails$
      .pipe(takeUntil(this.destroy$))
      .subscribe((produltDetail) => {
        if (produltDetail) {
          this.productDetails = produltDetail!;
          this._handleSuccessRequest();
        }
      });
  }

  private _getDataFromUrl(): void {
    this._activatedRoute.params.pipe(take(1)).subscribe((params: Params) => {
      this.productService.productUrl = params['url'];
      this.productService.getProductDetails();
    });
  }

  ngOnInit() {
    this.productService.getRelatedProducts();
  }

  private _handleSuccessRequest() {
    this._metaDataService.setMetaData(
      this.productDetails?.seoTitle ?? '',
      this.productDetails?.seoDescription
    );
    this.productValidationStatus = this.productService.checkProductValidation(
      this.productDetails
    );
    this.checkBasketStatus();
    this.productService.initialSellers();
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

  addToBasketGuest() {
    const productItem = {
      product: {
        id: this.productDetails.id,
        priceAfterDiscount: this.productDetails.currentPrice,
        name: this.productDetails.name,
        thumbnailImage: this.productDetails.image,
        discount: 0,
        price: this.productDetails.currentPrice,
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

  ngOnDestroy() {
    this.document.removeEventListener('mousewheel', this.onScroll);
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeBottomSheet() {
    this._bottomSheet.dismiss();
  }

  addtoBasket(bttmSheet: TemplateRef<any>) {
    const result = this.productService.addToBasket();
    if (result) {
      this._bottomSheet.open(bttmSheet);
    }
  }
}
