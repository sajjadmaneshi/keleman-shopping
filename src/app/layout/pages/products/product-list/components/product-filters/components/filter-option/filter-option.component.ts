import { Component, Input, OnInit } from '@angular/core';
import { ProductFilterService } from '../../../../../services/product-filter.service';
import {
  SelectableOption,
  SelectablePropertyModel,
} from '../../../../../data/models/view-models/category-property-option.view-model';
import { FilterOptionService } from '../../../../../services/filter-option.service';

@Component({
  selector: 'keleman-filter-option',
  templateUrl: './filter-option.component.html',
  styleUrls: ['./filter-option.component.scss'],
  providers: [FilterOptionService],
})
export class FilterOptionComponent implements OnInit {
  @Input() propertyOption!: SelectableOption;
  selectedItem!: SelectablePropertyModel | undefined;

  constructor(
    public productFilterService: ProductFilterService,
    public filterOptionService: FilterOptionService
  ) {}

  ngOnInit(): void {
    this.productFilterService.resetFilter$.subscribe(
      () => (this.selectedItem = undefined)
    );
    this.selectedItem = this.filterOptionService.determineSelectableArray(
      this.propertyOption
    );
  }

  public changeSelection(item: SelectablePropertyModel) {
    this.selectedItem = item;
    this.productFilterService.manageSelectedArray(item);
  }

  removeFilter($event: any, selectedItem: SelectablePropertyModel) {
    this.filterOptionService.removeFilter($event, selectedItem);
    this.selectedItem = undefined;
  }
}
