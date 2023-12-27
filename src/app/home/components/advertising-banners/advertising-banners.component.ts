import { Component, OnDestroy } from '@angular/core';
import { HomeRepository } from '../../data/repositories/home.repository';
import { AdsBannerViewModel } from '../../data/view-models/ads-banner.view-model';
import { Subject, Subscription, takeUntil, tap } from 'rxjs';
import { ENVIRONMENT } from '../../../../environments/environment';
import { SharedVariablesService } from '../../../shared/services/shared-variables.service';
import { LoadingService } from '../../../../common/services/loading.service';

@Component({
  selector: 'keleman-advertising-banners',
  templateUrl: './advertising-banners.component.html',
})
export class AdvertisingBannersComponent implements OnDestroy {
  banners!: AdsBannerViewModel[];
  destroy$ = new Subject<void>();

  constructor(
    private _homeRepository: HomeRepository,
    public loadingService: LoadingService,
    public sharedVariablesService: SharedVariablesService
  ) {
    this.loadingService.startLoading('read', 'advertisingBanner');
    this._init();
  }

  private _init() {
    this._homeRepository
      .getAdsBanner()
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'advertisingBanner')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => {
          this.banners = result.result!;
        },
        error: () =>
          this.loadingService.stopLoading('read', 'advertisingBanner'),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
