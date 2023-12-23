import { Component, OnDestroy } from '@angular/core';
import { GeneralRepository } from '../../../shared/data/repositories/general.repository';
import { Subject, takeUntil, tap } from 'rxjs';
import { LoadingService } from '../../../../common/services/loading.service';

@Component({
  selector: 'keleman-about-us-summary',
  templateUrl: './about-us-summary.component.html',
})
export class AboutUsSummaryComponent implements OnDestroy {
  aboutUsSummary!: string;
  destroy$ = new Subject<void>();

  constructor(
    private _generalRepositorty: GeneralRepository,
    public loadingService: LoadingService
  ) {
    this.loadingService.startLoading('read', 'aboutUs');
    this._getAboutUs();
  }

  private _getAboutUs() {
    this._generalRepositorty
      .getAboutUs()
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'aboutUs')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => {
          this.aboutUsSummary = result.result?.aboutUs!;
        },
        error: () => this.loadingService.stopLoading('read', 'aboutUs'),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
