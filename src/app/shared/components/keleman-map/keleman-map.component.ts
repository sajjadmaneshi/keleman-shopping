import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  Icon,
  icon,
  latLng,
  LatLng,
  LatLngExpression,
  LeafletEvent,
  LeafletMouseEvent,
  Map,
  MapOptions,
  marker,
  Marker,
  PanOptions,
  tileLayer,
} from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapService } from '../../services/map.service';
import { SearchResult } from 'leaflet-geosearch/lib/providers/provider';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RawResult } from 'leaflet-geosearch/lib/providers/openStreetMapProvider';
import { CommonModule } from '@angular/common';
import { GeoSearchComponent } from './geo-search/geo-search.component';

@Component({
  selector: 'keleman-map',
  templateUrl: './keleman-map.component.html',
  styleUrls: ['./keleman-map.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LeafletModule,
    NgbTypeahead,
    MatInputModule,
    MatAutocompleteModule,
    GeoSearchComponent,
  ],
})
export class KelemanMapComponent implements OnDestroy {
  @Input() options!: MapOptions;
  @Input() defaultLatLng: LatLngExpression = {
    lat: 29.612936035963546,
    lng: 52.48360186815262,
  };

  @Input() markerLatLng!: LatLngExpression;
  @Input() zoom!: number;
  @Input() readOnly!: boolean;
  @Input() showSearch!: boolean;
  @Input() searchLabel!: string;
  @Output() map$: EventEmitter<Map> = new EventEmitter();
  @Output() zoom$: EventEmitter<number> = new EventEmitter();
  @Output() mapClick: EventEmitter<SearchResult<RawResult>> =
    new EventEmitter();
  @Output() mapClickWaiting: EventEmitter<boolean> = new EventEmitter();

  private _map!: Map;
  private marker!: Marker;

  constructor(private _mapService: MapService) {}

  onMapReady(map: Map) {
    this._map = map;

    if (this.markerLatLng) {
      this._addMarker(this.markerLatLng as LatLng);
    }

    this.map$.emit(map);
    this.zoom$.emit(map.getZoom());
  }

  onMapZoomEnd(e: LeafletEvent): void {
    this.zoom$.emit(e.target.getZoom());
  }

  panTo(latLngExpression: LatLngExpression, options?: PanOptions): void {
    if (this._map) {
      this._map.panTo(latLngExpression, options);
    }
  }

  onMapClick(mouseEvent: LeafletMouseEvent): void {
    if (mouseEvent && !this.readOnly) {
      this._removeMarker();
      this._addMarker(mouseEvent.latlng);
    }
  }

  getOptions(): MapOptions {
    return {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          detectRetina: true,
          attribution:
            '&copy; <a href="https://www.keleman.org/">keleman</a> contributors',
        }),
      ],
      zoom: this.zoom ?? 1,
      center: this.markerLatLng ?? this.defaultLatLng ?? latLng(0, 0),
    };
  }
  onSelectAddress($event: SearchResult<RawResult>) {
    if (!this.readOnly) {
      this._removeMarker();
      this.panTo(latLng($event.y, $event.x));
      this._addMarker(latLng($event.y, $event.x));

      this.mapClick.emit($event);
    }
  }

  private _addMarker(markerLatLng: LatLng): void {
    const m = marker(markerLatLng, {
      icon: this._markerIcon(),
    });

    let contentPopup = '';
    if (markerLatLng.lat) {
      contentPopup = `${markerLatLng.lat}, ${markerLatLng.lng}`;
    }
    this.mapClickWaiting.emit(true);
    this._mapService
      .getAddressByLatLng(markerLatLng)
      .then((result: SearchResult<RawResult>[]) => {
        if (result && result.length > 0) {
          this.mapClick.emit(result[0]);
          contentPopup += `<br><br><b>${result[0].label}</b>`;
        }
      })
      .finally(() => {
        m.bindPopup(contentPopup).openPopup();
        m.addTo(this._map);
        this.marker = m;
        this.mapClickWaiting.emit(false);
      });
  }

  private _removeMarker(): void {
    if (this.marker) {
      this._map.removeLayer(this.marker);
    }
  }

  private _markerIcon(): Icon {
    return icon({
      iconSize: [41, 41],
      iconAnchor: [13, 41],
      popupAnchor: [0, -41],
      iconUrl: './assets/media/map-markers/location-pin.png',
      shadowUrl: './assets/media/map-markers/marker-shadow.png',
    });
  }

  ngOnDestroy(): void {
    try {
      this._map.clearAllEventListeners();
      this._map.remove();
    } catch (error) {}
  }
}
