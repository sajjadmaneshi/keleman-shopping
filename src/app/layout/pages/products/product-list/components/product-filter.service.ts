import { ApplicationRef, Injectable } from '@angular/core';
import { SelectedFilterModel } from './product-filters/data/selected-filter.model';

@Injectable()
export class ProductFilterService {
  filterList = new SelectedFilterModel();
  priceSliderReset = false;

  constructor(private _cr: ApplicationRef) {}
  public determineSelectedFilters(selectedArray: any[], dataArray: any[]) {
    selectedArray.forEach((selected) => {
      const item = dataArray.find((data) => data.id === selected.id);
      if (item) item.selected = true;
    });
    return dataArray;
  }

  onsSelectChange(selected: any, dataArray: any[], checked: boolean) {
    const item = dataArray.find((data) => data.id === selected.id);
    if (item) item.selected = checked;
    return dataArray;
  }

  manageSelectedArray(selectedItem: any, selectedArray: any[]) {
    const index = selectedArray.findIndex(
      (selected) => selected.id === selectedItem.id
    );
    if (index === -1 && selectedItem.selected) selectedArray.push(selectedItem);
    if (index !== -1 && !selectedItem.selected) selectedArray.splice(index, 1);
    return selectedArray;
  }

  get canRemoveAll() {
    return (
      this.filterList?.categories?.length > 0 ||
      this.filterList.outOfStock ||
      this.filterList?.sellers?.length > 0 ||
      this.filterList?.brands?.length > 0 ||
      this.filterList.price
    );
  }

  resetPrice() {
    this.priceSliderReset = true;
    this._cr.tick();
  }

  removeAll() {
    this.filterList = new SelectedFilterModel();
    this.resetPrice();
  }
}
