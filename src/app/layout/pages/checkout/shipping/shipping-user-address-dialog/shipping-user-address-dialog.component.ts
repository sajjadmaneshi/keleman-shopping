import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { UserAddressViewModel } from '../../../profile/data/view-models/user-address.view-model';
import { ProfileRepository } from '../../../profile/data/profile.repository';
import { Subject, takeUntil, tap } from 'rxjs';
import { LoadingService } from '../../../../../../common/services/loading.service';
import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { ModifyAddressDialogComponent } from '../../../profile/address/add-address-dialog/modify-address-dialog.component';

@Component({
  selector: 'keleman-shipping-user-address-dialog',

  templateUrl: './shipping-user-address-dialog.component.html',
  styleUrl: './shipping-user-address-dialog.component.scss',
})
export class ShippingUserAddressDialogComponent implements OnDestroy {
  userAddresses: UserAddressViewModel[] = [];
  selectedAddress!: UserAddressViewModel;
  destroy$ = new Subject<void>();

  @Output() submit = new EventEmitter<UserAddressViewModel>();

  constructor(
    private readonly _profileRepository: ProfileRepository,
    public readonly loadingService: LoadingService,
    public readonly _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public selectedId: number
  ) {
    loadingService.startLoading('read', 'getShippingAddresses');

    this.getAddresses();
  }

  public getAddresses() {
    this._profileRepository
      .getUserAddresses()
      .pipe(
        tap(() =>
          this.loadingService.stopLoading('read', 'getShippingAddresses')
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => {
          this.userAddresses = [...result.result!];
          this.selectedAddress = this.userAddresses.find(
            (x) => x.id === this.selectedId
          )!;
        },
        error: () =>
          this.loadingService.stopLoading('read', 'getShippingAddresses'),
      });
  }

  modifyAddress(isEdit = false, address?: UserAddressViewModel) {
    this._dialog
      .open(ModifyAddressDialogComponent, {
        width: '700px',
        autoFocus: false,
        data: isEdit ? address : null,
      })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) this.getAddresses();
      });
  }

  selectAddress(address: UserAddressViewModel) {
    this.selectedAddress = address;
  }
  onSubmit() {
    this.submit.emit(this.selectedAddress);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
