import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { SearchResult } from 'leaflet-geosearch/lib/providers/provider';
import { RawResult } from 'leaflet-geosearch/lib/providers/openStreetMapProvider';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { BehaviorSubject, debounceTime, Subject } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'keleman-geo-search',
  templateUrl: './geo-search.component.html',
  styleUrls: ['./geo-search.component.scss'],
  imports: [
    CommonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class GeoSearchComponent implements OnInit {
  @Output() onSelect = new EventEmitter<SearchResult<RawResult>>();
  searchAddressResult: SearchResult<RawResult>[] = [];

  isLoading$ = new BehaviorSubject<boolean>(false);
  private _searchSubject = new Subject<string>();

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    this._searchSubject.pipe(debounceTime(1000)).subscribe((searchValue) => {
      this._search(searchValue);
    });
  }

  private _search(value: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoading$.next(true);
      const provider = new OpenStreetMapProvider({
        params: { 'accept-language': 'fa' },
      });
      provider.search({ query: value }).then((res) => {
        this.searchAddressResult = [...res];
        this.isLoading$.next(false);
      });
    }
  }

  onKeyUp(value: string) {
    this._searchSubject.next(value);
  }

  selectOption($event: SearchResult<RawResult>) {
    this.onSelect.emit($event);
  }
}
