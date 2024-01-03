import { Component, OnDestroy } from '@angular/core';
import { UserAddressViewModel } from '../../profile/data/view-models/user-address.view-model';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil, tap } from 'rxjs';
import { ProfileRepository } from '../../profile/data/profile.repository';
import { LoadingService } from '../../../../../common/services/loading.service';
import { ModifyAddressDialogComponent } from '../../profile/address/add-address-dialog/modify-address-dialog.component';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'keleman-shipping',
  templateUrl: './shipping.component.html',
})
export class ShippingComponent implements OnDestroy {
  address!: UserAddressViewModel;
  destroy$ = new Subject<void>();

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _profileRepository: ProfileRepository,
    private readonly _basketService: BasketService,
    public readonly loadingSerivce: LoadingService
  ) {
    this.getShipingAddress();
  }

  getShipingAddress() {
    this.loadingSerivce.startLoading('read', 'getShippingAddress');
    this._profileRepository
      .getDefaultAddress()
      .pipe(
        tap(() =>
          this.loadingSerivce.stopLoading('read', 'getShippingAddress')
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => {
          this.address = result.result!;
          this._basketService.delivaryAddress$.next(this.address.id);
          if (this.address) {
            this._basketService.shippingCost(this.address.id);
          }
        },
        error: () =>
          this.loadingSerivce.stopLoading('read', 'getShippingAddress'),
      });
  }

  addAddress() {
    this._dialog
      .open(ModifyAddressDialogComponent, {
        width: '700px',
        autoFocus: false,
      })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) this.address = res;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
