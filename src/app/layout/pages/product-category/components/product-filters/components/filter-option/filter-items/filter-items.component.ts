import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectablePropertyModel } from '../../../../../../products/data/models/view-models/category-property-option.view-model';
import { ProductFilterService } from '../../../../../../products/services/product-filter.service';

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
