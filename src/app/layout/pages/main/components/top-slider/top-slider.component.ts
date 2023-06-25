import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { SharedVariablesService } from '../../../../../shared/services/shared-variables.service';
import { ApplicationStateService } from '../../../../../shared/services/application-state.service';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { HomeRepository } from '../../data/repositories/home.repository';
import { SliderViewModel } from '../../data/repositories/view-models/slider.view-model';
import { HttpClientResult } from '../../../../../shared/models/http/http-client.result';
import { ENVIRONMENT } from '../../../../../../environments/environment';

SwiperCore.use([Navigation, Pagination, Autoplay]);
@Component({
  selector: 'keleman-top-slider',
  templateUrl: './top-slider.component.html',
  styleUrls: ['./top-slider.component.scss'],
})
export class TopSliderComponent implements OnDestroy {
  isLoading$ = new BehaviorSubject(true);

  slides!: SliderViewModel[];
  destroy$ = new Subject<void>();
  downloadUrl = ENVIRONMENT.downloadUrl;
  constructor(
    private _changeDetector: ChangeDetectorRef,

    public applicationStateService: ApplicationStateService,
    public sharedVariableService: SharedVariablesService,
    private _homeRepository: HomeRepository
  ) {
    this._initSlide();
  }

  private _initSlide() {
    this.isLoading$.next(true);
    this._homeRepository
      .getSlidesOfSlider()
      .pipe(
        tap(() => {
          takeUntil(this.destroy$);
          setTimeout(() => this.isLoading$.next(false), 1500);
        })
      )
      .subscribe((result: HttpClientResult<SliderViewModel[]>) => {
        this.slides = [...result.result!];
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
