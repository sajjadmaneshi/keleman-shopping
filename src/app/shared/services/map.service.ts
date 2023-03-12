import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { Injectable } from '@angular/core';
import { LatLng } from 'leaflet';
import { SearchResult } from 'leaflet-geosearch/lib/providers/provider';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public getAddressByLatLng(latLng: LatLng): Promise<SearchResult[]> {
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

  public searchAddress(text: string): Promise<SearchResult[]> {
    const provider = new OpenStreetMapProvider({
      params: {
        'accept-language': 'fa',
        countrycodes: '98',
      },
    });

    return provider.search({ query: text });
  }
}
