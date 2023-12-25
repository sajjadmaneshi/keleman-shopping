import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import * as L from 'leaflet';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MapService } from '../../services/map.service';
import { SearchResult } from 'leaflet-geosearch/lib/providers/provider';
import { RawResult } from 'leaflet-geosearch/lib/providers/openStreetMapProvider';
import { GeoSearchComponent } from './geo-search/geo-search.component';

@Component({
  selector: 'keleman-map',
  templateUrl: './keleman-map.component.html',
  styleUrls: ['./keleman-map.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgbTypeahead,
    MatInputModule,
    MatAutocompleteModule,
    GeoSearchComponent,
  ],
})
export class KelemanMapComponent implements AfterViewInit {
  @Input() options!: L.MapOptions;
  @Input() defaultLatLng: L.LatLngExpression = {
    lat: 29.612936035963546,
    lng: 52.48360186815262,
  };

  @Input() markerLatLng!: L.LatLngExpression;
  @Input() zoom!: number;
  @Input() readOnly!: boolean;
  @Input() showSearch!: boolean;
  @Input() searchLabel!: string;
  @Output() map$: EventEmitter<L.Map> = new EventEmitter();
  @Output() zoom$: EventEmitter<number> = new EventEmitter();
  @Output() mapClick: EventEmitter<SearchResult<RawResult>> =
    new EventEmitter();
  @Output() mapClickWaiting: EventEmitter<boolean> = new EventEmitter();
  @Input() mapId: string = `map-${Date.now()}`;

  private _map!: L.Map;
  private _marker!: L.Marker;

  constructor(
    private _mapService: MapService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngAfterViewInit() {
    if (!this._map) {
      this.onMapReady();
    }
  }

  onMapReady() {
    if (isPlatformBrowser(this.platformId)) {
      this._map = L.map(this.mapId, {
        center: this.defaultLatLng,
        zoom: 3,
        ...this.getOptions(),
      });

      if (this.markerLatLng) {
        this._addMarker(this.markerLatLng as L.LatLng);
      }

      this.map$.emit(this._map);
      this.zoom$.emit(this._map.getZoom());
      this._map.on('zoomend', (e) => this.onMapZoomEnd(e));
      this._map.on('click', (e) => this.onMapClick(e));
    }
  }
  onMapZoomEnd(e: L.LeafletEvent): void {
    this.zoom$.emit(e.target.getZoom());
  }

  panTo(latLngExpression: L.LatLngExpression, options?: L.PanOptions): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this._map) {
        this._map.panTo(latLngExpression, options);
      }
    }
  }

  onMapClick(mouseEvent: L.LeafletMouseEvent): void {
    if (mouseEvent && !this.readOnly) {
      this._removeMarker();
      this._addMarker(mouseEvent.latlng);
    }
  }

  getOptions(): L.MapOptions {
    return {
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          detectRetina: true,
          attribution:
            '&copy; <a href="https://www.keleman.org/">keleman</a> contributors',
        }),
      ],
      zoom: this.zoom ?? 1,
      zoomControl: !this.readOnly,
      scrollWheelZoom: !this.readOnly,
      boxZoom: !this.readOnly,
      doubleClickZoom: !this.readOnly,
      markerZoomAnimation: !this.readOnly,
      touchZoom: !this.readOnly,
      attributionControl: false,
      dragging: !this.readOnly,

      center: this.markerLatLng ?? this.defaultLatLng ?? L.latLng(0, 0),
    };
  }
  onSelectAddress($event: SearchResult<RawResult>) {
    if (!this.readOnly) {
      this._removeMarker();
      this.panTo(L.latLng($event.y, $event.x));
      this._addMarker(L.latLng($event.y, $event.x));

      this.mapClick.emit($event);
    }
  }

  private _addMarker(markerLatLng: L.LatLng): void {
    const m = L.marker(markerLatLng, {
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
      .catch((error: any) => {
        console.error('Error getting address by LatLng:', error);
      })
      .finally(() => {
        m.bindPopup(contentPopup).openPopup();
        m.addTo(this._map);
        this._marker = m;
        this.mapClickWaiting.emit(false);
      });
  }

  private _removeMarker(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this._marker) {
        this._map.removeLayer(this._marker);
      }
    }
  }

  private _markerIcon(): L.Icon {
    return L.icon({
      iconSize: [41, 41],
      iconAnchor: [13, 41],
      popupAnchor: [0, -41],
      iconUrl: './assets/media/map-markers/location-pin.png',
      shadowUrl: './assets/media/map-markers/marker-shadow.png',
    });
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        this._map.clearAllEventListeners();
        this._map.remove();
      } catch (error) {}
    }
  }
}
