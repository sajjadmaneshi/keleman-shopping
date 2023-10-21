import { Injectable } from '@angular/core';
import {
  SelectableOption,
  SelectablePropertyModel,
} from '../data/models/view-models/category-property-option.view-model';
import { ProductFilterService } from './product-filter.service';

@Injectable()
export class FilterOptionService {
  private _propertyOption!: SelectableOption;

  constructor(private _productFilterService: ProductFilterService) {}

  public determineSelectableArray(propertyOption: SelectableOption) {
    return this._isThisOptionInQueryList(propertyOption)
      ? this._productFilterService.determineSelectedArray(propertyOption)
      : undefined;
  }

  private _isThisOptionInQueryList(propertyOption: SelectableOption) {
    return (
      Object.keys(this._productFilterService.queryParams).findIndex(
        (propertyKey: string) => propertyKey === propertyOption.seoTitle
      ) != -1
    );
  }

  public removeFilter($event: Event, item: SelectablePropertyModel) {
    $event.stopPropagation();
    item.selected = false;
    this._productFilterService.removeFromFilterList(item.option.seoTitle);
    this._productFilterService.navigateWithNewParams();
  }
}
