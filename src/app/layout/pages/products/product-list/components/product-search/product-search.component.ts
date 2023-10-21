import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { Routing } from '../../../../../../routing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ProductFilterService } from '../../../services/product-filter.service';
import { SelectedFilterModel } from '../product-filters/data/selected-filter.model';

@Component({
  selector: 'keleman-product-search',

  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnChanges {
  destroy$ = new Subject<void>();

  @Input() initialSearchText = '';

  searchText = new FormControl('');

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _productFIlterService: ProductFilterService
  ) {}

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

  ngOnChanges(changes: SimpleChanges): void {
    this.searchText.patchValue(this.initialSearchText);
  }
}
