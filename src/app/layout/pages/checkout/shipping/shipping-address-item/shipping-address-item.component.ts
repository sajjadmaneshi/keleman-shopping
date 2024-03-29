import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
} from '@angular/core';

import { UserAddressViewModel } from '../../../profile/data/view-models/user-address.view-model';
import { UserShippingAddressDialogComponent } from '../user-shipping-addresss/user-shipping-address-dialog/user-shipping-address-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { catchError, map, of, Subject, takeUntil, tap } from 'rxjs';
import { ProfileRepository } from '../../../profile/data/profile.repository';
import { LoadingService } from '../../../../../../common/services/loading.service';
import { ApplicationStateService } from '../../../../../shared/services/application-state.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'keleman-shipping-address-item',
  templateUrl: './shipping-address-item.component.html',
  styleUrl: './shipping-address-item.component.scss',
})
export class ShippingAddressItemComponent implements OnDestroy {
  @Input() address!: UserAddressViewModel;
  @Input() selected = false;
  @Input() showMap = true;
  @Input() editable = false;
  @Output() edit = new EventEmitter<void>();
  @Output() addressChange = new EventEmitter<UserAddressViewModel>();
  destroy$ = new Subject<void>();

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _profileRepository: ProfileRepository,
    private readonly _bottomSheet: MatBottomSheet,
    public readonly applicationStateService: ApplicationStateService,
    public loadingService: LoadingService
  ) {}

  openAddressDialog() {
    const dialogRef = this._dialog.open(UserShippingAddressDialogComponent, {
      width: '700px',
      data: this.address.id,
    });
    dialogRef.componentInstance.submit
      .pipe(takeUntil(this.destroy$))
      .subscribe((selectedAddress: UserAddressViewModel) => {
        if (selectedAddress) {
          this.setShippingAddress(selectedAddress.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((result) => {
              if (result) {
                dialogRef.close();
                this.addressChange.emit(selectedAddress);
              }
            });
        }
      });
  }

  setShippingAddress(addressId: number) {
    this.loadingService.startLoading('add', 'defaultAddress');
    return this._profileRepository.addDefaultAddress(addressId).pipe(
      tap(() => this.loadingService.stopLoading('add', 'defaultAddress')),
      takeUntil(this.destroy$),
      map(() => true),
      catchError(() => {
        this.loadingService.stopLoading('add', 'defaultAddress');
        return of(false);
      })
    );
  }

  getMarkerLatLng(lat: number, lng: number): any {
    return { lat, lng };
  }

  onEdit() {
    this.edit.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openBottomSheet(template: TemplateRef<any>) {
    this._bottomSheet.open(template);
  }

  changeAddress() {
    this.addressChange.emit();
  }

  closeBottomSheet() {
    this._bottomSheet.dismiss();
  }
}
