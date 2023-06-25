import { Component, OnDestroy } from '@angular/core';
import { ApplicationStateService } from './shared/services/application-state.service';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ApplicationStateService],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'بازرگانی آسانسور کلمان';

  private _loadingSubscription!: Subscription;

  constructor(
    private _applicationState: ApplicationStateService,
    private _title: Title,

    private router: Router,
    private loadingService: LoadingService
  ) {
    _title.setTitle(this.title);
    this._applicationState.init();
    this._loadingSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      } else if (event instanceof NavigationEnd) {
        this.loadingService.hide();
      }
    });
  }
  ngOnDestroy() {
    this._loadingSubscription.unsubscribe();
  }
}
