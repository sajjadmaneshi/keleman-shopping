import { Component, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { GeneralRepository } from '../../../../../../shared/data/repositories/general.repository';
import { SearchViewModel } from '../../../../../../shared/data/models/search.view-model';
import { Router } from '@angular/router';
import { Routing } from '../../../../../../routing';

@Component({
  selector: 'keleman-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent implements OnInit {
  isLoading = false;
  searchTextChanged = new Subject<string>();
  showMenu = false;
  destroy$ = new Subject<void>();
  searchText!: string;

  searchResult: SearchViewModel = { products: [], articles: [] };

  constructor(
    private _generalRepository: GeneralRepository,
    private _router: Router
  ) {}
  keyChange($event: any) {
    if ($event.code === 'Enter') this._navigateToProduct();
    else {
      this.searchTextChanged.next($event.target.value);
      this.isLoading = true;
    }
  }

  ngOnInit(): void {
    this.searchTextChanged
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((search) => {
        if (search) {
          this.searchText = search;
          this._search();
        } else this.resetSearchResult();
      });
  }

  private _search() {
    this.showMenu = true;
    const queryParam = `?q=${this.searchText}`;
    this._generalRepository
      .search(queryParam)
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        this.searchResult = result.result!;
      });
  }

  resetSearchResult() {
    [this.showMenu, this.isLoading, this.searchText] = [false, false, ''];
    this.searchResult = { products: [], articles: [] };
  }

  private _navigateToProduct() {
    this.showMenu = false;
    this._router.navigate([Routing.products], {
      queryParams: { q: this.searchText, p: '0' },
    });
  }
}
