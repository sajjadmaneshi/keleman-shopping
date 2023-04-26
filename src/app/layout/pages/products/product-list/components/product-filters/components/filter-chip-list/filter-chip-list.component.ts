import { Component } from '@angular/core';
import { ProductFilterService } from '../../../product-filter.service';

@Component({
  selector: 'keleman-filter-chip-list',
  templateUrl: './filter-chip-list.component.html',
  styleUrls: ['./filter-chip-list.component.scss'],
})
export class FilterChipListComponent {
  constructor(public productFilterService: ProductFilterService) {}

  removeCategoryChip(value: any) {
    const index = this.productFilterService.filterList.categories.findIndex(
      (catergory) => catergory.id === value.id
    );
    if (index !== -1)
      this.productFilterService.filterList.categories.splice(index, 1);
  }

  removeBrandChip(value: any) {
    const index = this.productFilterService.filterList.brands.findIndex(
      (brand) => brand.id === value.id
    );
    if (index !== -1)
      this.productFilterService.filterList.brands.splice(index, 1);
  }

  removeSellerChip(value: any) {
    const index = this.productFilterService.filterList.sellers.findIndex(
      (seller) => seller.id === value.id
    );
    if (index !== -1)
      this.productFilterService.filterList.sellers.splice(index, 1);
  }

  removeOutOfStockChip() {
    this.productFilterService.filterList.outOfStock = false;
  }

  removePriceRange() {
    this.productFilterService.filterList.price = undefined;
  }
}
