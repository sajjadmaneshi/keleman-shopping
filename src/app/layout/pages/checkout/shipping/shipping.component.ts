import { Component } from '@angular/core';
import { UserAddressViewModel } from '../../profile/data/view-models/user-address.view-model';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil, tap } from 'rxjs';
import { ProfileRepository } from '../../profile/data/profile.repository';
import { LoadingService } from '../../../../../common/services/loading.service';
import { ModifyAddressDialogComponent } from '../../profile/address/add-address-dialog/modify-address-dialog.component';
import { BasketService } from '../purchase/basket.service';

@Component({
  selector: 'keleman-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
})
export class ShippingComponent {
  address!: UserAddressViewModel;
  destroy$ = new Subject<void>();

  constructor(
    private _dialog: MatDialog,
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
          this._basketService.delivaryAddress.next(this.address.id);
          if (this.address) {
            this._basketService.getShippingCost(this.address.id);
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
      .subscribe((res) => {
        if (res) this.address = res;
      });
  }
}
