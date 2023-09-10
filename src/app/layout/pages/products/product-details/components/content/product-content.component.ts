import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';
import SwiperCore, { Pagination } from 'swiper';
import { MatDialog } from '@angular/material/dialog';
import { PriceChartDialogComponent } from './price-chart-dialog/price-chart-dialog.component';
import { ProductDetailViewModel } from '../../../data/models/view-models/product-detail.view-model';
import { ENVIRONMENT } from '../../../../../../../environments/environment';
import { SharedVariablesService } from '../../../../../../shared/services/shared-variables.service';
import { ProductGalleryViewModel } from '../../../data/models/view-models/product-gallery.view-model';
import { ProductRepository } from '../../../data/repositories/product.repository';
import { ProductService } from '../../../product.service';
import { ProductPriceChartViewModel } from '../../../data/models/view-models/product-price-chart.view-model';

SwiperCore.use([Pagination]);
@Component({
  selector: 'keleman-product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.scss'],
})
export class ProductContentComponent implements OnChanges {
  @Input() productDetails!: ProductDetailViewModel;

  @Input() isLoading = false;

  downloadUrl = ENVIRONMENT.downloadUrl;

  isFavorite$ = new BehaviorSubject(false);

  productMeta!: { price: number; currentStock: number };

  subscription!: Subscription;

  productCurrentImage!: ProductGalleryViewModel;

  gallary!: ProductGalleryViewModel[];

  gallaryLoading = new BehaviorSubject<boolean>(true);

  destroy$ = new Subject<void>();

  priceChartData: ProductPriceChartViewModel[] = [];

  constructor(
    public applicationState: ApplicationStateService,
    public sharedVariableService: SharedVariablesService,

    private _productRepository: ProductRepository,
    private _productService: ProductService,
    public dialog: MatDialog
  ) {
    this.loadPriceChart();
  }
  addToFavorite() {
    this.isFavorite$.next(true);
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
    }
  }

  private _getGallary() {
    this.subscription = this._productRepository
      .getProductGallary(this._productService.productUrl)
      .pipe(tap(() => this.gallaryLoading.next(false)))
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
}

function createProductImageMapper(productDetails: ProductDetailViewModel): any {
  return {
    image: productDetails.image,
    imageAlt: productDetails.imageAlt,
    thumbnailImage: productDetails.thumbnailImage,
    id: 0,
  };
}
