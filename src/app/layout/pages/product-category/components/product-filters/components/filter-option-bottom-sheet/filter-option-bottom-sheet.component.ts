import { Component, OnDestroy } from '@angular/core';
import { FilterOptionComponent } from '../filter-option/filter-option.component';
import { MatDialog } from '@angular/material/dialog';

import { FiltersDialogComponent } from '../filters-dialog/filters-dialog.component';
import { filter, Subject, takeUntil } from 'rxjs';
import { ProductFilterService } from '../../../../../products/services/product-filter.service';
import { FilterOptionService } from '../../../../../products/services/filter-option.service';
import {
  SelectableOption,
  SelectablePropertyModel,
} from '../../../../../products/data/models/view-models/category-property-option.view-model';

@Component({
  selector: 'keleman-filter-option-bottom-sheet',
  templateUrl: './filter-option-bottom-sheet.component.html',
  styleUrls: ['./filter-option-bottom-sheet.component.scss'],
})
export class FilterOptionBottomSheetComponent
  extends FilterOptionComponent
  implements OnDestroy
{
  dialogConfigs = {
    width: '500px',
    panelClass: 'custom-mat-dialog',
    enterAnimationDuration: '100ms',
    exitAnimationDuration: '100ms',
    autoFocus: false,
  };

  destroy$ = new Subject<void>();
  constructor(
    public dialog: MatDialog,
    productFilterService: ProductFilterService,
    filterOptionService: FilterOptionService
  ) {
    super(productFilterService, filterOptionService);
  }

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
      .subscribe((result: SelectablePropertyModel) => {
        this.selectedItem = result;
        this.productFilterService.manageSelectedArray(result);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
