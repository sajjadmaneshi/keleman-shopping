import { Component, OnDestroy } from '@angular/core';
import { GeneralRepository } from '../../../shared/data/repositories/general.repository';
import { FooterViewModel } from '../../../shared/data/models/view-models/footer.view-model';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'keleman-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnDestroy {
  footerData!: FooterViewModel;
  isLoading = false;

  subscription!: Subscription;

  iconNamesCol1 = ['contact_support', 'policy', 'call'];
  iconNamesCol2 = ['credit_card', 'shopping_cart', 'undo', 'policy', 'article'];

  constructor(private _generalRepository: GeneralRepository) {
    this._init();
  }

  private _init() {
    this.subscription = this._generalRepository
      .getFooter()
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe((result) => {
        this.footerData = result.result!;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
