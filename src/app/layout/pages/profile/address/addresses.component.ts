import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModifyAddressDialogComponent } from './add-address-dialog/modify-address-dialog.component';

import { UserAddressViewModel } from '../data/view-models/user-address.view-model';
import { Subject, takeUntil, tap } from 'rxjs';
import { ProfileRepository } from '../data/profile.repository';
import { ProductViewModel } from '../../products/data/models/view-models/product.view-model';

@Component({
  selector: 'keleman-address',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent {
  isLoading = true;
  destroy$ = new Subject<void>();
  myAddresses: UserAddressViewModel[] = [];
  constructor(
    public dialog: MatDialog,
    private readonly _profileRepository: ProfileRepository
  ) {
    this.getAddresses();
  }

  public getAddresses() {
    this._profileRepository
      .getUserAddresses()
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        this.myAddresses = [...result.result!];
        console.log(result.result!);
      });
  }

  updateDefaultAddress(newDefaultId: number): void {
    this.myAddresses.forEach((address) => {
      address.isDefault = address.id === newDefaultId;
    });
  }

  openDialog() {
    this.dialog
      .open(ModifyAddressDialogComponent, {
        width: '700px',
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) this.getAddresses();
      });
  }

  trackByFn(index: number, item: UserAddressViewModel) {
    return item.id;
  }
}
