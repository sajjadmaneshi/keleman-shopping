import { Component, Input } from '@angular/core';

import { AddressWithSelected } from '../addresses.component';
import { LatLngExpression } from 'leaflet';
import { MatIconModule } from '@angular/material/icon';
import { KelemanMapComponent } from '../../../../../shared/components/keleman-map/keleman-map.component';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'keleman-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.scss'],
  standalone: true,
  imports: [MatIconModule, KelemanMapComponent, NgbTooltip],
})
export class AddressItemComponent {
  @Input() address!: AddressWithSelected;
  @Input() mine: boolean = false;

  getMarkerLatLng(lat: number, lng: number): LatLngExpression {
    return { lat, lng } as LatLngExpression;
  }
}
