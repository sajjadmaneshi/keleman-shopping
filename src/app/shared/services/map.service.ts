import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LatLng } from 'leaflet';
import { SearchResult } from 'leaflet-geosearch/lib/providers/provider';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}
  public getAddressByLatLng(latLng: LatLng): Promise<SearchResult[]> | any {
    if (isPlatformBrowser(this.platformId)) {
      const provider = new OpenStreetMapProvider({
        params: {
          'accept-language': 'fa',
          countrycodes: '98',
        },
      });

      let contentPopup = '';
      if (latLng.lat) {
        contentPopup = `${latLng.lat}, ${latLng.lng}`;
      }
      return provider.search({ query: contentPopup.replace(' ', '') });
    }
  }

  public searchAddress(text: string): Promise<SearchResult[]> | any {
    if (isPlatformBrowser(this.platformId)) {
      const provider = new OpenStreetMapProvider({
        params: {
          'accept-language': 'fa',
          countrycodes: '98',
        },
      });

      return provider.search({ query: text });
    }
  }
}
