import { Component, OnDestroy } from '@angular/core';
import { GeneralRepository } from '../../../shared/data/repositories/general.repository';
import { FooterViewModel } from '../../../shared/data/models/view-models/footer.view-model';
import { Subject, Subscription, takeUntil, tap } from 'rxjs';
import { LoadingService } from '../../../../common/services/loading.service';

@Component({
  selector: 'keleman-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnDestroy {
  footerData!: FooterViewModel;

  destroy$ = new Subject<void>();

  iconNamesCol1 = ['contact_support', 'policy', 'call'];
  iconNamesCol2 = ['credit_card', 'shopping_cart', 'undo', 'policy', 'article'];

  constructor(
    private _generalRepository: GeneralRepository,
    public loadingService: LoadingService
  ) {
    this._init();
  }

  private _init() {
    this.loadingService.startLoading('read', 'footer');
    this._generalRepository
      .getFooter()
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'footer')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => (this.footerData = result.result!),
        error: () => this.loadingService.stopLoading('read', 'footer'),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
