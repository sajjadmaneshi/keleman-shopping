import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductFilterService } from '../../../product-filter.service';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'keleman-seller-filter-items',
  templateUrl: './seller-filter-items.component.html',
  styleUrls: ['../filter-items.scss'],
})
export class SellerFilterItemsComponent {
  @Input() selectedArray: any[] = [];

  @Output() selectionChange = new EventEmitter<any>();
  sellers = [
    {
      id: 1,
      title: 'کلمان',
      selected: false,
    },
    {
      id: 2,
      title: 'روماتو',
      selected: false,
    },
    {
      id: 3,
      title: 'سیلور',
      selected: false,
    },
    {
      id: 4,
      title: 'پرو',
      selected: false,
    },
    {
      id: 5,
      title: 'آرتون',
      selected: false,
    },
  ];

  constructor(public productFilterService: ProductFilterService) {}
  ngOnInit(): void {
    if (this.selectedArray) {
      this.sellers = this.productFilterService.determineSelectedFilters(
        this.selectedArray,
        this.sellers
      );
    }
  }

  onSelectChange(selectedBrand: any, checked: boolean) {
    this.sellers = this.productFilterService.onsSelectChange(
      selectedBrand,
      this.sellers,
      checked
    );
    this.selectionChange.emit(selectedBrand);
  }
}
