import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';

import Swiper, { EffectCreative, Navigation } from 'swiper';
import SwiperCore from 'swiper';
import { ProductViewModel } from '../../../layout/pages/products/data/models/view-models/product.view-model';
import { HttpClientResult } from '../../../shared/data/models/http/http-client.result';
import { HomeRepository } from '../../data/repositories/home.repository';
import { LoadingService } from '../../../../common/services/loading.service';
import { SharedVariablesService } from '../../../shared/services/shared-variables.service';

SwiperCore.use([EffectCreative, Navigation]);
@Component({
  selector: 'keleman-package-swiper',
  templateUrl: './package-swiper.component.html',
  styleUrls: ['./package-swiper.component.scss'],
})
export class PackageSwiperComponent implements AfterViewInit, OnDestroy {
  slides: ProductViewModel[] = [];
  swiper: any;
  destroy$ = new Subject<void>();
  constructor(
    private _homeRepository: HomeRepository,
    public sharedVariablesService: SharedVariablesService,
    public loadingSerive: LoadingService
  ) {}

  private _init() {
    this.loadingSerive.startLoading('read', 'packages');
    this._homeRepository
      .getPackages()
      .pipe(
        tap(() => this.loadingSerive.stopLoading('read', 'packages')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result: HttpClientResult<ProductViewModel[]>) => {
          this.slides = [...result.result!];
        },
        error: () => this.loadingSerive.stopLoading('read', 'packages'),
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
