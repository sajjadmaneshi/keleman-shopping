import { Component, TemplateRef } from '@angular/core';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'keleman-products-sort',
  templateUrl: './products-sort.component.html',
  styleUrls: ['./products-sort.component.scss'],
})
export class ProductsSortComponent {
  selectedSortValue = 1;

  sortItems = [
    { title: 'محبوب ترین', value: 1 },
    { title: 'پرفروش ترین', value: 2 },
    { title: 'تخفیف دار', value: 3 },
    { title: 'ارزان ترین', value: 4 },
    { title: 'گرانترین', value: 5 },
  ];

  constructor(
    public applicationState: ApplicationStateService,
    private _bottomSheet: MatBottomSheet
  ) {}

  openBottomSheet(element: TemplateRef<any>) {
    this._bottomSheet.open(element);
  }
  onSelectSort(value: number) {
    this.selectedSortValue = value;
  }
  closeBottomSheet() {
    this._bottomSheet.dismiss();
  }
}
