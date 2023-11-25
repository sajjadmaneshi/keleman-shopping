import { Component, OnDestroy } from '@angular/core';
import { GeneralRepository } from '../../../shared/data/repositories/general.repository';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'keleman-about-us-summary',
  templateUrl: './about-us-summary.component.html',
})
export class AboutUsSummaryComponent implements OnDestroy {
  aboutUsSummary!: string;
  isLoading = false;

  subscription!: Subscription;

  constructor(private _generalRepositorty: GeneralRepository) {
    this._getAboutUs();
  }

  private _getAboutUs() {
    this.subscription = this._generalRepositorty
      .getAboutUs()
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe((result) => {
        this.aboutUsSummary = result.result?.aboutUs!;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
