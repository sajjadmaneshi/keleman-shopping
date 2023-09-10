import { Component, OnDestroy } from '@angular/core';

import { ProductViewModel } from '../../../../layout/pages/products/data/models/view-models/product.view-model';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { SharedVariablesService } from '../../../../shared/services/shared-variables.service';
import { HomeRepository } from '../../../data/repositories/home.repository';
import { HttpClientResult } from '../../../../shared/data/models/http/http-client.result';
import { ProductCategoryViewModel } from '../../../../shared/data/models/view-models/product-category.view-model';
@Component({
  selector: 'app-amazing-offer-swiper',
  templateUrl: './amazing-offer-swiper.component.html',
  styleUrls: ['./amazing-offer-swiper.component.scss'],
})
export class AmazingOfferSwiperComponent implements OnDestroy {
  isLoading = new BehaviorSubject(false);
  slides: ProductViewModel[] = [];
  destroy$ = new Subject<void>();
  constructor(
    public sahredVariableService: SharedVariablesService,
    private _homeRepository: HomeRepository
  ) {
    this._init();
  }

  private _init() {
    this.isLoading.next(true);
    this._homeRepository
      .getAmazingOffers()
      .pipe(
        tap(() => this.isLoading.next(false)),
        takeUntil(this.destroy$)
      )
      .subscribe((result: HttpClientResult<ProductViewModel[]>) => {
        this.slides = [...result.result!];
      });
  }

  tranckByFn(index: number, item: ProductViewModel) {
    return item.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
