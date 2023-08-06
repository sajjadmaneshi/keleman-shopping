import { Component, OnDestroy } from '@angular/core';
import { GeneralRepository } from '../../../shared/data/repositories/general.repository';
import { FooterViewModel } from '../../../shared/data/models/view-models/footer.view-model';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'keleman-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnDestroy {
  footerData!: FooterViewModel;
  isLoading = false;

  subscription!: Subscription;

  iconNames = [
    'curtains',
    'horizontal_distribute',
    'door_sliding ',
    'cable ',
    'dashboard_customize',
    'room_preferences',
    'handyman',
    'handyman',
    'bolt ',
    'inventory',
    'memory',
    'dashboard_customize',
    'dashboard_customize',
  ];

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
    this.subscription.unsubscribe();
  }
}
