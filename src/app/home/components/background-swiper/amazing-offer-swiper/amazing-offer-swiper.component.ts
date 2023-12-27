import { Component, OnDestroy } from '@angular/core';
import { ProductViewModel } from '../../../../layout/pages/products/data/models/view-models/product.view-model';
import { Subject, takeUntil, tap } from 'rxjs';
import { SharedVariablesService } from '../../../../shared/services/shared-variables.service';
import { HomeRepository } from '../../../data/repositories/home.repository';
import { HttpClientResult } from '../../../../shared/data/models/http/http-client.result';
import { LoadingService } from '../../../../../common/services/loading.service';
@Component({
  selector: 'app-amazing-offer-swiper',
  templateUrl: './amazing-offer-swiper.component.html',
  styleUrls: ['./amazing-offer-swiper.component.scss'],
})
export class AmazingOfferSwiperComponent implements OnDestroy {
  amazingOffers: ProductViewModel[] = [];
  destroy$ = new Subject<void>();
  constructor(
    private _homeRepository: HomeRepository,
    public loadingService: LoadingService,
    public sahredVariableService: SharedVariablesService
  ) {
    this._init();
  }

  private _init() {
    this.loadingService.startLoading('read', 'amazingOffers');
    this._homeRepository
      .getAmazingOffers()
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'amazingOffers')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result: HttpClientResult<ProductViewModel[]>) =>
          (this.amazingOffers = [...result.result!]),
        error: () => this.loadingService.stopLoading('read', 'amazingOffers'),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
