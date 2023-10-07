import { Component, OnDestroy } from '@angular/core';
import { ProductFilterService } from '../../../product-filter.service';
import { SelectablePropertyModel } from '../../../../../data/models/view-models/category-property-option.view-model';

@Component({
  selector: 'keleman-filter-chip-list',
  templateUrl: './filter-chip-list.component.html',
  styleUrls: ['./filter-chip-list.component.scss'],
})
export class FilterChipListComponent implements OnDestroy {
  constructor(public productFilterService: ProductFilterService) {}

  removeChip(value: SelectablePropertyModel) {
    value.selected = false;
    this.productFilterService.manageSelectedArray(value);
  }

  removeOutOfStockChip() {
    this.productFilterService.filterList.outOfStock = false;
  }

  removePriceRange() {
    this.productFilterService.filterList.price = undefined;
    this.productFilterService.resetPrice();
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }
}
