import { Component, Input } from '@angular/core';

import { AddressWithSelected } from '../addresses.component';
import { LatLngExpression } from 'leaflet';

@Component({
  selector: 'keleman-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.scss'],
})
export class AddressItemComponent {
  @Input() address!: AddressWithSelected;

  getMarkerLatLng(lat: number, lng: number): LatLngExpression {
    return { lat, lng } as LatLngExpression;
  }
}
