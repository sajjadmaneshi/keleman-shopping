import { Component } from '@angular/core';
import { ApplicationStateService } from './shared/services/application-state.service';
import { Meta, Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs';
import { PageLoadingService } from './shared/services/pageLoadingService';

import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [PageLoadingService],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'بازرگانی آسانسور کلمان';

  private _loadingSubscription!: Subscription;

  constructor(
    private _applicationState: ApplicationStateService,
    private _title: Title,
    private meta: Meta,
    private _platform: Platform
  ) {
    _title.setTitle(this.title);
    this._setMetaTag();
    this._applicationState.init();
  }

  private _setMetaTag() {
    const metaTagBase = 'width=device-width, initial-scale=1.0';
    const metaTagContent =
      this._platform.IOS || this._platform.SAFARI
        ? metaTagBase + ' maximum-scale=1, user-scalable=0'
        : metaTagBase;

    this.meta.addTags([{ name: 'viewport', content: metaTagContent }]);
  }
}
