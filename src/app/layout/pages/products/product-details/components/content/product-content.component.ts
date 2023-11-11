import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  BehaviorSubject,
  map,
  Subject,
  Subscription,
  takeUntil,
  tap,
} from 'rxjs';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';
import SwiperCore, { Pagination } from 'swiper';
import { MatDialog } from '@angular/material/dialog';
import { PriceChartDialogComponent } from './price-chart-dialog/price-chart-dialog.component';
import { ProductDetailViewModel } from '../../../data/models/view-models/product-detail.view-model';
import { ENVIRONMENT } from '../../../../../../../environments/environment';
import { SharedVariablesService } from '../../../../../../shared/services/shared-variables.service';
import { ProductGalleryViewModel } from '../../../data/models/view-models/product-gallery.view-model';
import { ProductRepository } from '../../../data/repositories/product.repository';
import { ProductService } from '../../../services/product.service';
import { ProductPriceChartViewModel } from '../../../data/models/view-models/product-price-chart.view-model';
import { AlertDialogComponent } from '../../../../../../shared/components/alert-dialog/alert-dialog.component';
import { AlertDialogDataModel } from '../../../../../../shared/components/alert-dialog/alert-dialog-data.model';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../../../../../shared/services/auth/auth.service';
import { Routing } from '../../../../../../routing';
import { SnackBarService } from '../../../../../../shared/components/snack-bar/snack-bar.service';

SwiperCore.use([Pagination]);
@Component({
  selector: 'keleman-product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.scss'],
})
export class ProductContentComponent implements OnInit, OnChanges, OnDestroy {
  @Input() productDetails!: ProductDetailViewModel;
  @Input() isLoading = false;
  favoriteLoading = false;

  isFavorite$ = new BehaviorSubject(false);

  productMeta!: { price: number; currentStock: number };

  productCurrentImage!: ProductGalleryViewModel;

  gallary: ProductGalleryViewModel[] = [];
  priceChartData: ProductPriceChartViewModel[] = [];
  gallaryLoading = new BehaviorSubject<boolean>(true);
  destroy$ = new Subject<void>();

  isLoggedIn = false;

  constructor(
    public applicationState: ApplicationStateService,
    public sharedVariableService: SharedVariablesService,
    public dialog: MatDialog,
    private _router: Router,
    private _productRepository: ProductRepository,
    private _productService: ProductService,
    private _authService: AuthService,
    private _snackBarService: SnackBarService
  ) {
    this.loadPriceChart();
  }

  ngOnInit(): void {
    this._authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  public likeDislike() {
    if (this.isLoggedIn) this._doFavorite();
    else this.openRegisterBeforeActionDialog();
  }

  openRegisterBeforeActionDialog() {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
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

  private _doFavorite() {
    this.favoriteLoading = true;
    this._productRepository
      .favorite(this.productDetails.id)
      .pipe(
        tap(() => (this.favoriteLoading = false)),
        takeUntil(this.destroy$),
        map((x) => x.result!)
      )
      .subscribe((res) => {
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
      });
  }

  private _checkFavoriteStatus() {
    if (!this.isLoading && this.productDetails) {
      this.favoriteLoading = true;
      this._productRepository
        .isLiked(this.productDetails.id)
        .pipe(
          tap(() => (this.favoriteLoading = false)),
          takeUntil(this.destroy$),
          map((x) => x.result!)
        )
        .subscribe((favoriteStatus) => this.isFavorite$.next(favoriteStatus));
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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.productDetails) {
      this._getGallary();
      this.LoadNewImage(this.productDetails);
      this.productMeta = {
        price: this.productDetails.currentPrice,
        currentStock: this.productDetails.currentStock,
      };
      if (this.isLoggedIn) this._checkFavoriteStatus();
    }
  }

  private _getGallary() {
    this._productRepository
      .getProductGallary(this._productService.productUrl)
      .pipe(
        tap(() => this.gallaryLoading.next(false)),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        this.gallary = [...result.result!];
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
