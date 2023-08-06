import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';

import Swiper, { EffectCreative, Navigation } from 'swiper';
import SwiperCore from 'swiper';
import { ProductViewModel } from '../../../products/data/models/view-models/product.view-model';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { HomeRepository } from '../../data/repositories/home.repository';

SwiperCore.use([EffectCreative, Navigation]);
@Component({
  selector: 'keleman-package-swiper',
  templateUrl: './package-swiper.component.html',
  styleUrls: ['./package-swiper.component.scss'],
})
export class PackageSwiperComponent implements AfterViewInit, OnDestroy {
  isLoading = new BehaviorSubject(false);
  slides: ProductViewModel[] = [];
  swiper: any;

  destroy$ = new Subject<void>();
  constructor(private _homeRepository: HomeRepository) {}

  private _init() {
    this.isLoading.next(true);
    this._homeRepository
      .getPackages()
      .pipe(
        tap(() => setTimeout(() => this.isLoading.next(false), 1500)),
        takeUntil(this.destroy$)
      )
      .subscribe((result: HttpClientResult<ProductViewModel[]>) => {
        this.slides = [...result.result!];
      });
  }

  ngAfterViewInit(): void {
    this.swiper = new Swiper('.mySwiper2', {
      slidesPerView: 'auto',
      grabCursor: true,
      effect: 'creative',
    });
    this._init();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
