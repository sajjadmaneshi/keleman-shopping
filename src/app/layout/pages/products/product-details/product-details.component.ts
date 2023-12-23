import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductDetailViewModel } from '../data/models/view-models/product-detail.view-model';
import { ProductRepository } from '../data/repositories/product.repository';
import { Subject, takeUntil, tap } from 'rxjs';
import { ProductService } from '../services/product.service';
import { DOCUMENT } from '@angular/common';
import { AvailableStatusEnum } from '../data/enums/available-status.enum';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { GuestBasketService } from '../../checkout/guest-basket.service';
import { ModifyMetaDataService } from '../../../../../common/services/modify-meta-data.service';
import { BasketService } from '../../checkout/purchase/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [ModifyMetaDataService],
})
export class ProductDetailsComponent implements OnInit {
  productDetails!: ProductDetailViewModel;
  isLoading = false;
  productStatus: AvailableStatusEnum = AvailableStatusEnum.AVAILABLE;
  availableStatusEnum = AvailableStatusEnum;
  isInBasket = false;
  inBasketCount: number = 0;
  productCountInBasket = 0;
  isLoggedIn = false;
  private destroy$ = new Subject<void>();
  constructor(
    public readonly applicationState: ApplicationStateService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _productRepository: ProductRepository,
    private readonly _productService: ProductService,
    private readonly _authService: AuthService,
    private readonly _guestBasketService: GuestBasketService,
    private readonly _basketService: BasketService,
    private readonly _metaDataService: ModifyMetaDataService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this._authService.isLoggedIn$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.isLoggedIn = res));
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
    this.isLoading = true;
    this._productRepository
      .getProductDetails(this._productService.productUrl)
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        this.productDetails = result.result!;
        this._metaDataService.setMetaData(
          this.productDetails.seoTitle,
          this.productDetails.seoDescription
        );
        this.productStatus = this._productService.getProductStatus(
          this.productDetails
        );
        this.checkBasketStatus();
      });
  }

  private checkBasketStatus() {
    if (this.productDetails) {
      this.isInBasket = this._guestBasketService.isProductInBasket(
        this.productDetails.id
      );
      if (this.isInBasket) {
        this.productCountInBasket =
          this._guestBasketService.getProductCountInBasket(
            this.productDetails.id
          );
      }

      this._basketService
        .inBasketCount(this.productDetails.id)
        .subscribe((result) => (this.inBasketCount = result));
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
    if (!this.isLoggedIn) {
      const productItem = {
        product: this.productDetails,
        count: 1,
      };
      this._guestBasketService.addToBasket(productItem);
      this.productCountInBasket++;
    }
  }

  removeFromBasket() {
    if (!this.isLoggedIn) {
      this._guestBasketService.removeFromBasket(this.productDetails.id);
      this.productCountInBasket--;
    }
  }
}
