import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductFilterService } from '../../../product-filter.service';

@Component({
  selector: 'keleman-category-filter-items',
  templateUrl: './category-filter-items.component.html',
  styleUrls: ['../filter-items.scss'],
})
export class CategoryFilterItemsComponent {
  @Input() selectedArray: any[] = [];

  @Output() selectionChange = new EventEmitter<any>();
  categories = [
    {
      title: 'الکو',
      id: 1,
      selected: false,
    },
    {
      title: 'روماتو',
      id: 2,
      selected: false,
    },
    {
      title: 'سیلور',
      id: 3,
      selected: false,
    },
    {
      title: 'پرو',
      id: 4,
      selected: false,
    },
    {
      title: 'آرتون',
      id: 5,
      selected: false,
    },
  ];

  constructor(public productFilterService: ProductFilterService) {}

  ngOnInit(): void {
    if (this.selectedArray) {
      this.categories = this.productFilterService.determineSelectedFilters(
        this.selectedArray,
        this.categories
      );
    }
  }

  onSelectChange(selectedBrand: any, checked: boolean) {
    this.categories = this.productFilterService.onsSelectChange(
      selectedBrand,
      this.categories,
      checked
    );
    this.selectionChange.emit(selectedBrand);
  }
}
