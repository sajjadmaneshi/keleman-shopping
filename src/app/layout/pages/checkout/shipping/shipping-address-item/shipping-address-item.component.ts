import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  PLATFORM_ID,
} from '@angular/core';

import { UserAddressViewModel } from '../../../profile/data/view-models/user-address.view-model';
import { ShippingUserAddressDialogComponent } from '../shipping-user-address-dialog/shipping-user-address-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LatLngExpression } from 'leaflet';
import { isPlatformBrowser } from '@angular/common';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'keleman-shipping-address-item',

  templateUrl: './shipping-address-item.component.html',
  styleUrl: './shipping-address-item.component.scss',
})
export class ShippingAddressItemComponent {
  @Input() address!: UserAddressViewModel;
  @Input() showMap = true;
  @Input() editable = false;

  @Output() edit = new EventEmitter<void>();

  isBrowser!: boolean;
  constructor(
    private readonly _dialog: MatDialog,
    private readonly _basketService: BasketService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  openAddressDialog() {
    this._dialog
      .open(ShippingUserAddressDialogComponent, {
        width: '700px',
        data: this.address.id,
      })
      .afterClosed()
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
}
