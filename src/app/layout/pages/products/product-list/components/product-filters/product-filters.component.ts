import { Component } from '@angular/core';
import { ProductFilterService } from '../product-filter.service';
import { PriceRange } from './components/product-price-filter/product-price-filter.component';

@Component({
  selector: 'keleman-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
})
export class ProductFiltersComponent {
  constructor(public productFilterService: ProductFilterService) {}
  changeOutOfStock(checked: boolean) {
    this.productFilterService.filterList.outOfStock = checked;
  }
  onChangePrice(priceRange: PriceRange) {
    this.productFilterService.filterList.price = priceRange;
  }
}
