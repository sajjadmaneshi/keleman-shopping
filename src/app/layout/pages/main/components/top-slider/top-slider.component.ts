import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { SharedVariablesService } from '../../../../../shared/services/shared-variables.service';
import { ApplicationStateService } from '../../../../../shared/services/application-state.service';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { BehaviorSubject } from 'rxjs';

SwiperCore.use([Navigation, Pagination, Autoplay]);
@Component({
  selector: 'keleman-top-slider',
  templateUrl: './top-slider.component.html',
  styleUrls: ['./top-slider.component.scss'],
})
export class TopSliderComponent implements AfterViewInit {
  isLoading$ = new BehaviorSubject(true);
  constructor(
    private _changeDetector: ChangeDetectorRef,

    public applicationStateService: ApplicationStateService,
    public sharedVariableService: SharedVariablesService
  ) {}

  ngAfterViewInit(): void {
    this.isLoading$.next(false);
    this._changeDetector.detectChanges();
  }
}
