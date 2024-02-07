import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { LoadingService } from '../../../../../../../common/services/loading.service';

@Component({
  selector: 'keleman-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchTextChanged = new Subject<string>();
  showMenu = false;
  destroy$ = new Subject<void>();
  searchText!: string;
  searchResult: SearchViewModel = { products: [], articles: [] };

  constructor(
    private readonly _generalRepository: GeneralRepository,
    private readonly _router: Router,
    public readonly loadingService: LoadingService
  ) {}
  keyChange($event: any) {
    this.showMenu = false;
    if ($event.code === 'Enter') this._navigateToProduct();
    else {
      this.searchTextChanged.next($event.target.value);
      this.searchText = $event.target.value;
      this.loadingService.startLoading('add', 'search');
    }
  }

  ngOnInit(): void {
    this.searchTextChanged
      .pipe(
        debounceTime(2000),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
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
        tap(() => this.loadingService.stopLoading('add', 'search')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => {
          this.searchResult = result.result!;
        },
        error: () => this.loadingService.stopLoading('add', 'search'),
      });
  }

  resetSearchResult() {
    [this.showMenu, this.searchText] = [false, ''];
    this.loadingService.stopLoading('add', 'search');
    this.searchResult = { products: [], articles: [] };
  }

  private _navigateToProduct() {
    this.showMenu = false;
    this._router.navigate([`${Routing.product}/${Routing.category}`], {
      queryParams: { q: this.searchText, p: '0' },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showResultMenu() {
    if (this.searchText) {
      this.showMenu = true;
    }
  }
}
