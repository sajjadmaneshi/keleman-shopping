import { Injectable } from '@angular/core';

@Injectable()
export class ProductFilterService {
  static selected: any[] = [];
  public determineSelectedFilters(selectedArray: any[], dataArray: any[]) {
    selectedArray.forEach((selected) => {
      const item = dataArray.find((data) => data.id === selected.id);
      if (item) item.selected = true;
    });
    return dataArray;
  }
  onSelect(selected: any, checked: boolean, dataArray: any[]) {
    if (checked) this._addToSelected(selected);
    else this._removeFromSelected(selected);

    const item = dataArray.find((data) => data.id === selected.id);
    if (item) {
      item.selected = checked;
    }
    return ProductFilterService.selected;
  }

  private _addToSelected(selectedValue: any) {
    const index = ProductFilterService.selected.findIndex(
      (selected) => selected.id === selectedValue.id
    );
    if (index === -1) {
      ProductFilterService.selected.push(selectedValue);
    }
  }
  private _removeFromSelected(selectedValue: any) {
    const index = ProductFilterService.selected.findIndex(
      (selected) => selected.id === selectedValue.id
    );
    if (index != -1) {
      ProductFilterService.selected.splice(index, 1);
    }
  }
}
