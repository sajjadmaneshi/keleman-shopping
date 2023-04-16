import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectedFilterModel } from '../data/selected-filter.model';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'keleman-filter-chip-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatChipsModule],
  templateUrl: './filter-chip-list.component.html',
  styleUrls: ['./filter-chip-list.component.scss'],
})
export class FilterChipListComponent implements OnInit {
  @Input('filterList') inputFilterList!: SelectedFilterModel;
  filterList = new SelectedFilterModel();

  ngOnInit(): void {
    this.filterList = this.inputFilterList;
  }

  removeCategoryChip(value: any) {
    const index = this.filterList.categories.findIndex(
      (catergory) => catergory.id === value.id
    );
    if (index != -1) this.filterList.categories.splice(index, 1);
  }

  removeBrandChip(value: any) {
    const index = this.filterList.brands.findIndex(
      (brand) => brand.id === value.id
    );
    if (index != -1) this.filterList.brands.splice(index, 1);
  }

  removeSellerChip(value: any) {
    const index = this.filterList.sellers.findIndex(
      (seller) => seller.id === value.id
    );
    if (index != -1) this.filterList.sellers.splice(index, 1);
  }

  removeAvailableChip() {
    this.filterList.isAvailable = true;
  }
}
