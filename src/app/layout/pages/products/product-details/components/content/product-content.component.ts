import { Component, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';
import SwiperCore, { Pagination } from 'swiper';
import { MatDialog } from '@angular/material/dialog';
import { PriceChartDialogComponent } from './price-chart-dialog/price-chart-dialog.component';

SwiperCore.use([Pagination]);
@Component({
  selector: 'keleman-product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductContentComponent {
  isFavorite$ = new BehaviorSubject(false);

  constructor(
    public applicationState: ApplicationStateService,
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
