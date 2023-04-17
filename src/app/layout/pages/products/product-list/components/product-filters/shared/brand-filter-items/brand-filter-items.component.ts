import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductFilterService } from '../../../product-filter.service';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'keleman-brand-filter-items',
  templateUrl: './brand-filter-items.component.html',
  styleUrls: ['../filter-items.scss'],
})
export class BrandFilterItemsComponent implements OnInit {
  @Input() selectedArray: any[] = [];

  @Output() selectionChange = new EventEmitter<any>();

  brands = [
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
    {
      title: 'الکو',
      id: 6,
      selected: false,
    },
    {
      title: 'الکو',
      id: 7,
      selected: false,
    },
    {
      title: 'الکو',
      id: 8,
      selected: false,
    },
    {
      title: 'الکو',
      id: 9,
      selected: false,
    },
    {
      title: 'الکو',
      id: 10,
      selected: false,
    },
    {
      title: 'الکو',
      id: 11,
      selected: false,
    },
    {
      title: 'الکو',
      id: 12,
      selected: false,
    },
  ];

  constructor(public productFilterService: ProductFilterService) {}
  ngOnInit(): void {
    if (this.selectedArray) {
      this.brands = this.productFilterService.determineSelectedFilters(
        this.selectedArray,
        this.brands
      );
    }
  }

  onSelectChange(selectedBrand: any, checked: boolean) {
    this.brands = this.productFilterService.onsSelectChange(
      selectedBrand,
      this.brands,
      checked
    );
    this.selectionChange.emit(selectedBrand);
  }
}
