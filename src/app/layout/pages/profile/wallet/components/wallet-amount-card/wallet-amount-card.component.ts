import { Component, OnDestroy } from '@angular/core';
import { InitialAppService } from '../../../../../../shared/services/initial-app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'keleman-wallet-amount-card',
  templateUrl: './wallet-amount-card.component.html',
  styleUrls: ['./wallet-amount-card.component.scss'],
})
export class WalletAmountCardComponent implements OnDestroy {
  walletAmount = 0;

  subscription!: Subscription;

  constructor(private _initAppService: InitialAppService) {
    _initAppService.userCredit.subscribe((res) => {
      this.walletAmount = res.walletValue;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
