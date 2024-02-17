import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserAddressViewModel } from '../../../../profile/data/view-models/user-address.view-model';
import { Subject, takeUntil, tap } from 'rxjs';
import { ProfileRepository } from '../../../../profile/data/profile.repository';
import { LoadingService } from '../../../../../../../common/services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { ModifyAddressDialogComponent } from '../../../../profile/address/add-address-dialog/modify-address-dialog.component';

@Component({
  selector: 'keleman-user-shipping-address-bottom-sheet',

  templateUrl: './user-shipping-address-bottom-sheet.component.html',
  styleUrl: './user-shipping-address-bottom-sheet.component.scss',
})
export class UserShippingAddressBottomSheetComponent {
  userAddresses: UserAddressViewModel[] = [];
  selectedAddress!: UserAddressViewModel;
  destroy$ = new Subject<void>();
  @Input() selectedId!: number;
  @Output() close = new EventEmitter();
  @Output() select = new EventEmitter<UserAddressViewModel>();

  constructor(
    private readonly _profileRepository: ProfileRepository,
    public readonly loadingService: LoadingService,
    public readonly _dialog: MatDialog
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
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
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
    this.select.emit(address);
    this.selectedAddress = address;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClose() {
    this.close.emit();
  }
}
