import { Component, Input, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';
import SwiperCore, { Pagination } from 'swiper';
import { MatDialog } from '@angular/material/dialog';
import { PriceChartDialogComponent } from './price-chart-dialog/price-chart-dialog.component';
import { ProductDetailViewModel } from '../../../data/models/view-models/product-detail.view-model';
import { ENVIRONMENT } from '../../../../../../../environments/environment';
import { SharedVariablesService } from '../../../../../../shared/services/shared-variables.service';

SwiperCore.use([Pagination]);
@Component({
  selector: 'keleman-product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductContentComponent {
  @Input() productDetails!: ProductDetailViewModel;

  @Input() isLoading = false;

  downloadUrl = ENVIRONMENT.downloadUrl;

  isFavorite$ = new BehaviorSubject(false);

  constructor(
    public applicationState: ApplicationStateService,
    public sharedVariableService: SharedVariablesService,
    public dialog: MatDialog
  ) {}
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
    });
  }
}
