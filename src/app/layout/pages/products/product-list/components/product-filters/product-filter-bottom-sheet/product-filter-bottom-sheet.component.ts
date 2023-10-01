import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialogComponent } from './dialogs/filters-dialog/filters-dialog.component';
import { filter, Subject, takeUntil } from 'rxjs';
import { PriceRange } from '../components/product-price-filter/product-price-filter.component';
import { ProductFilterService } from '../../product-filter.service';
import {
  SelectableOption,
  SelectablePropertyModel,
} from '../../../../data/models/view-models/category-property-option.view-model';

@Component({
  selector: 'keleman-product-filter-bottom-sheet',
  templateUrl: './product-filter-bottom-sheet.component.html',
  styleUrls: ['./product-filter-bottom-sheet.component.scss'],
})
export class ProductFilterBottomSheetComponent {
  dialogConfigs = {
    width: '500px',
    panelClass: 'custom-mat-dialog',
    enterAnimationDuration: '100ms',
    exitAnimationDuration: '100ms',
    autoFocus: false,
  };

  destroy$ = new Subject<void>();

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _cr: ChangeDetectorRef,
    public dialog: MatDialog,
    public productFilterService: ProductFilterService
  ) {}

  openFilterDialog(option: SelectableOption) {
    const dialogRef = this.dialog.open(FiltersDialogComponent, {
      ...this.dialogConfigs,
      data: option,
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => result),
        takeUntil(this.destroy$)
      )
      .subscribe((result: SelectablePropertyModel[]) => {
        this.productFilterService.filterList.filters = [...result];
      });
  }

  changeOutOfStock(checked: boolean) {
    this.productFilterService.filterList.outOfStock = checked;
  }

  onChangePrice(priceRange: PriceRange) {
    this.productFilterService.filterList.price = priceRange;
  }

  closeBottomSheet() {
    this._bottomSheet.dismiss();
  }

  tranckByFn(index: number, item: SelectableOption) {
    return item.title;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
