import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductFilterService } from '../../../../../../services/product-filter.service';
import { SelectablePropertyModel } from '../../../../../../data/models/view-models/category-property-option.view-model';

@Component({
  selector: 'keleman-filter-items',
  templateUrl: './filter-items.component.html',
})
export class FilterItemsComponent {
  @Input() initialProperties: SelectablePropertyModel[] = [];

  @Output() selectionChange = new EventEmitter<any>();

  constructor(public productFilterService: ProductFilterService) {}

  changeSelection(property: SelectablePropertyModel) {
    property.selected = true;
    this.selectionChange.emit(property);
  }
}
