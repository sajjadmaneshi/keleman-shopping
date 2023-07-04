import { Component, Input } from '@angular/core';
import { SearchViewModel } from '../../../../../../../shared/data/models/search.view-model';

@Component({
  selector: 'keleman-search-result-menu',
  templateUrl: './search-result-menu.component.html',
  styleUrls: ['./search-result-menu.component.scss'],
})
export class SearchResultMenuComponent {
  @Input() searchResult!: SearchViewModel;
  @Input() searchText!: string;
}
