import { Component, OnDestroy } from '@angular/core';
import { SharedVariablesService } from '../../../shared/services/shared-variables.service';
import { ApplicationStateService } from '../../../shared/services/application-state.service';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { HomeRepository } from '../../data/repositories/home.repository';
import { SliderViewModel } from '../../data/view-models/slider.view-model';
import { HttpClientResult } from '../../../shared/data/models/http/http-client.result';
import { LoadingService } from '../../../../common/services/loading.service';

SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'keleman-top-slider',
  templateUrl: './top-slider.component.html',
  styleUrls: ['./top-slider.component.scss'],
})
export class TopSliderComponent implements OnDestroy {
  slides: SliderViewModel[] = [];
  destroy$ = new Subject<void>();

  constructor(
    public applicationStateService: ApplicationStateService,
    public sharedVariableService: SharedVariablesService,
    public loadingService: LoadingService,
    private _homeRepository: HomeRepository
  ) {
    this._initSlide();
  }

  private _initSlide() {
    this.loadingService.startLoading('read', 'slider');

    this._homeRepository
      .getSlidesOfSlider()
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'slider')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result: HttpClientResult<SliderViewModel[]>) => {
          this.slides = [...result.result!];
        },
        error: () => this.loadingService.stopLoading('read', 'slider'),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
