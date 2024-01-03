import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  PLATFORM_ID,
} from '@angular/core';

import { UserAddressViewModel } from '../../../profile/data/view-models/user-address.view-model';
import { ShippingUserAddressDialogComponent } from '../shipping-user-address-dialog/shipping-user-address-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LatLngExpression } from 'leaflet';
import { isPlatformBrowser } from '@angular/common';
import { BasketService } from '../../services/basket.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'keleman-shipping-address-item',
  templateUrl: './shipping-address-item.component.html',
  styleUrl: './shipping-address-item.component.scss',
})
export class ShippingAddressItemComponent implements OnDestroy {
  @Input() address!: UserAddressViewModel;
  @Input() showMap = true;
  @Input() editable = false;
  @Output() edit = new EventEmitter<void>();

  destroy$ = new Subject<void>();

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _basketService: BasketService
  ) {}

  openAddressDialog() {
    this._dialog
      .open(ShippingUserAddressDialogComponent, {
        width: '700px',
        data: this.address.id,
      })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: UserAddressViewModel) => {
        if (res) {
          this.address = res;
          this._basketService.shippingCost(res.id);
          this._basketService.delivaryAddress$.next(res.id);
        }
      });
  }

  getMarkerLatLng(lat: number, lng: number): LatLngExpression {
    return { lat, lng } as LatLngExpression;
  }

  onEdit() {
    this.edit.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
