import { Component, OnDestroy } from '@angular/core';
import { HomeRepository } from '../../data/repositories/home.repository';
import { AdsBannerViewModel } from '../../data/view-models/ads-banner.view-model';
import { Subscription, tap } from 'rxjs';
import { ENVIRONMENT } from '../../../../environments/environment';
import { SharedVariablesService } from '../../../shared/services/shared-variables.service';

@Component({
  selector: 'keleman-advertising-banners',
  templateUrl: './advertising-banners.component.html',
})
export class AdvertisingBannersComponent implements OnDestroy {
  isLoading = false;

  banners!: AdsBannerViewModel[];

  subscription!: Subscription;

  downloadUrl = ENVIRONMENT.downloadUrl;

  constructor(
    private _homeRepository: HomeRepository,
    public sharedVariablesService: SharedVariablesService
  ) {
    this._init();
  }

  private _init() {
    this.subscription = this._homeRepository
      .getAdsBanner()
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe((result) => {
        this.banners = result.result!;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
