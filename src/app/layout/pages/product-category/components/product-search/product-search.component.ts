import { Component, Input, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';

import { SelectedFilterModel } from '../product-filters/data/selected-filter.model';
import { ProductFilterService } from '../../../products/services/product-filter.service';

@Component({
  selector: 'keleman-product-search',

  templateUrl: './product-search.component.html',
})
export class ProductSearchComponent implements OnChanges {
  destroy$ = new Subject<void>();

  @Input() initialSearchText = '';

  searchText = new FormControl('');

  constructor(private _productFIlterService: ProductFilterService) {}

  navigateToProduct() {
    this._productFIlterService.addToFilterList(
      new SelectedFilterModel('q', '', this.searchText.value!)
    );
    this._productFIlterService.navigateWithNewParams();
  }

  resetSearch() {
    this.searchText.reset();
    this._productFIlterService.resetSearch();
  }

  ngOnChanges(): void {
    this.searchText.patchValue(this.initialSearchText);
  }
}
