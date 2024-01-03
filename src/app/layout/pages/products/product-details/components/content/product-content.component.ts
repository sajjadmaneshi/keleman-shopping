import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, map, Subject, takeUntil, tap } from 'rxjs';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';
import SwiperCore, { Pagination } from 'swiper';
import { MatDialog } from '@angular/material/dialog';
import { PriceChartDialogComponent } from './price-chart-dialog/price-chart-dialog.component';
import { ProductDetailViewModel } from '../../../data/models/view-models/product-detail.view-model';
import { SharedVariablesService } from '../../../../../../shared/services/shared-variables.service';
import { ProductGalleryViewModel } from '../../../data/models/view-models/product-gallery.view-model';
import { ProductRepository } from '../../../data/repositories/product.repository';
import { ProductService } from '../../../services/product.service';
import { ProductPriceChartViewModel } from '../../../data/models/view-models/product-price-chart.view-model';
import { AlertDialogComponent } from '../../../../../../shared/components/alert-dialog/alert-dialog.component';
import { AlertDialogDataModel } from '../../../../../../shared/components/alert-dialog/alert-dialog-data.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../shared/services/auth/auth.service';
import { Routing } from '../../../../../../routing';
import { SnackBarService } from '../../../../../../shared/components/snack-bar/snack-bar.service';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { LoadingService } from '../../../../../../../common/services/loading.service';

SwiperCore.use([Pagination]);
@Component({
  selector: 'keleman-product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.scss'],
})
export class ProductContentComponent implements OnInit, OnChanges, OnDestroy {
  @Input() productDetails!: ProductDetailViewModel;
  @Input() isLoading = false;
  isFavorite$ = new BehaviorSubject(false);
  productCurrentImage!: ProductGalleryViewModel;
  gallary: ProductGalleryViewModel[] = [];
  priceChartData: ProductPriceChartViewModel[] = [];
  destroy$ = new Subject<void>();

  isLoggedIn = false;

  constructor(
    public readonly applicationState: ApplicationStateService,
    public readonly sharedVariableService: SharedVariablesService,
    public readonly dialog: MatDialog,
    public readonly loadingService: LoadingService,
    private readonly _router: Router,
    private readonly _productRepository: ProductRepository,
    private readonly _productService: ProductService,
    private readonly _authService: AuthService,
    private readonly _snackBarService: SnackBarService
  ) {
    this.loadPriceChart();
  }

  ngOnInit(): void {
    this._authService.isLoggedIn$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  public likeDislike() {
    if (this.isLoggedIn) this._doFavorite();
    else this.openRegisterBeforeActionDialog();
  }

  openRegisterBeforeActionDialog() {
    this.dialog.open(AlertDialogComponent, {
      data: {
        message: 'لطفا قبل از افزودن به علاقه مندی ها وارد سایت شوید',
        callBackButtonText: 'واردشوید',
        callBackFunction: () =>
          this._router.navigate([Routing.register], {
            queryParams: { redirectUrl: this._router.routerState.snapshot.url },
          }),
      } as AlertDialogDataModel,
    });
  }

  openShareDialog() {
    this.dialog.open(ShareDialogComponent);
  }

  private _doFavorite() {
    this.loadingService.startLoading('add', 'doFavorite');
    this._productRepository
      .favorite(this.productDetails.id)
      .pipe(
        tap(() => this.loadingService.stopLoading('add', 'doFavorite')),
        takeUntil(this.destroy$),
        map((x) => x.result!)
      )
      .subscribe({
        next: (res) => {
          this.isFavorite$.next(res);

          this._snackBarService.showPrimarySnackBar(
            res
              ? 'با موفقیت به لیست علاقه مندی هاافزوده شد'
              : 'با موفقیت از لیست علاقه مندی ها حذف شد',
            {
              horizontalPosition: 'center',
              verticalPosition:
                this.applicationState.isTablet || this.applicationState.isPhone
                  ? 'top'
                  : 'bottom',
            }
          );
        },
        error: () => this.loadingService.stopLoading('add', 'doFavorite'),
      });
  }

  private _checkFavoriteStatus() {
    if (!this.isLoading && this.productDetails) {
      this.loadingService.startLoading('add', 'doFavorite');
      this._productRepository
        .isLiked(this.productDetails.id)
        .pipe(
          tap(() => this.loadingService.stopLoading('add', 'doFavorite')),
          takeUntil(this.destroy$),
          map((x) => x.result!)
        )
        .subscribe({
          next: (favoriteStatus) => this.isFavorite$.next(favoriteStatus),
          error: () => this.loadingService.stopLoading('add', 'doFavorite'),
        });
    }
  }

  removeFromFavorite() {
    this.isFavorite$.next(false);
  }

  showChart() {
    this.dialog.open(PriceChartDialogComponent, {
      width: '900px',
      autoFocus: false,
      data: {
        productTitle: this.productDetails.name,
        price: this.priceChartData,
      },
    });
  }

  ngOnChanges(): void {
    if (this.productDetails) {
      this._getGallary();
      this.LoadNewImage(this.productDetails);

      if (this.isLoggedIn) this._checkFavoriteStatus();
    }
  }

  private _getGallary() {
    this.loadingService.startLoading('read', 'productGallery');
    this._productRepository
      .getProductGallary(this._productService.productUrl)
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'productGallery')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => (this.gallary = [...result.result!]),
        error: () => this.loadingService.stopLoading('read', 'productGallery'),
      });
  }

  LoadNewImage($event: ProductGalleryViewModel) {
    this.productCurrentImage = createProductImageMapper(
      $event as ProductDetailViewModel
    );
  }

  loadPriceChart() {
    this._productRepository
      .getProductPriceChart(this._productService.productUrl)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.priceChartData = [...result.result!];
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

function createProductImageMapper(productDetails: ProductDetailViewModel): any {
  return {
    image: productDetails.image,
    imageAlt: productDetails.imageAlt,
    thumbnailImage: productDetails.thumbnailImage,
    id: 0,
  };
}
