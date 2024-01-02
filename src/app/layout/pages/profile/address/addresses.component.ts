import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModifyAddressDialogComponent } from './add-address-dialog/modify-address-dialog.component';

import { UserAddressViewModel } from '../data/view-models/user-address.view-model';
import { Subject, takeUntil, tap } from 'rxjs';
import { ProfileRepository } from '../data/profile.repository';

@Component({
  selector: 'keleman-address',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent implements OnDestroy {
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
      .subscribe({
        next: (result) => {
          this.myAddresses = [...result.result!];
        },
        error: () => (this.isLoading = false),
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
