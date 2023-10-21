import { Component } from '@angular/core';
import { GeneralRepository } from '../../../shared/data/repositories/general.repository';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'keleman-about-us-summary',
  templateUrl: './about-us-summary.component.html',
})
export class AboutUsSummaryComponent {
  aboutUsSummary!: string;
  isLoading = false;

  subscribtion!: Subscription;

  constructor(private _generalRepositorty: GeneralRepository) {
    this._getAboutUs();
  }

  private _getAboutUs() {
    this.subscribtion = this._generalRepositorty
      .getAboutUs()
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe((result) => {
        this.aboutUsSummary = result.result?.aboutUs!;
      });
  }
}
