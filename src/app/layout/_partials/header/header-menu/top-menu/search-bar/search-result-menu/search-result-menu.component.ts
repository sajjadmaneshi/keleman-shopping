import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchViewModel } from '../../../../../../../shared/data/models/search.view-model';
import { Router } from '@angular/router';
import { Routing } from '../../../../../../../routing';

@Component({
  selector: 'keleman-search-result-menu',
  templateUrl: './search-result-menu.component.html',
})
export class SearchResultMenuComponent {
  @Input() searchResult!: SearchViewModel;
  @Input() searchText!: string;
  @Output() onItemClick = new EventEmitter<void>();
  constructor(private _router: Router) {}
  navigateProduct(url: string) {
    this.onItemClick.emit();
    this._router.navigate([`${Routing.products}/${url}`], {
      queryParams: { q: this.searchText, p: 0 },
    });
  }

  navigateArticle(url: string) {
    this.onItemClick.emit();
    this._router.navigate([`${Routing.magazine}/${url}`], {
      queryParams: { q: this.searchText, p: 0 },
    });
  }
}
