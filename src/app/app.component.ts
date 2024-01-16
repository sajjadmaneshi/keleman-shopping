import { Component, OnDestroy } from '@angular/core';
import { ApplicationStateService } from './shared/services/application-state.service';
import { Meta, Title } from '@angular/platform-browser';

import { BehaviorSubject, Subject, Subscription, takeUntil } from 'rxjs';

import { Platform } from '@angular/cdk/platform';
import { NavigationLoadingService } from './shared/services/navigation-loading.service';
import {
  NavigationEnd,
  NavigationSkipped,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'بازرگانی آسانسور کلمان';
  destroy$ = new Subject<void>();

  constructor(
    _title: Title,
    private _applicationState: ApplicationStateService,
    private meta: Meta,
    private _platform: Platform,
    private readonly _router: Router,
    private readonly _navigationLoading: NavigationLoadingService
  ) {
    _title.setTitle(this.title);
    this._setMetaTag();
    this._applicationState.init();
    this._router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      console.log(event);
      if (event instanceof NavigationStart) {
        this._navigationLoading.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationSkipped
      ) {
        this._navigationLoading.hide();
      }
    });
  }

  private _setMetaTag() {
    const metaTagBase = 'width=device-width, initial-scale=1.0';
    const metaTagContent =
      this._platform.IOS || this._platform.SAFARI
        ? metaTagBase + ' maximum-scale=1, user-scalable=0'
        : metaTagBase;

    this.meta.addTags([{ name: 'viewport', content: metaTagContent }]);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
