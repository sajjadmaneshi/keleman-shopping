import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../../../../../../shared/components/bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'keleman-products-sort',
  templateUrl: './products-sort.component.html',
  styleUrls: ['./products-sort.component.scss'],
})
export class ProductsSortComponent {
  @ViewChild('sortBottomSheet') sortBottomSheet!: TemplateRef<any>;

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

  openSort() {
    this._bottomSheet.open(this.sortBottomSheet);
  }
  onSelectSort(value: number) {
    this.selectedSortValue = value;
  }
  closeBottomSheet() {
    this._bottomSheet.dismiss();
  }
}
