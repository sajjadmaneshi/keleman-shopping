import {
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { BrandsDialogComponent } from './brands-dialog/brands-dialog.component';
import { SellersDialogComponent } from './sellers-dialog/sellers-dialog.component';
import { SelectedFilterModel } from '../data/selected-filter.model';
import { filter } from 'rxjs';

@Component({
  selector: 'keleman-product-filter-bottom-sheet',
  templateUrl: './product-filter-bottom-sheet.component.html',
  styleUrls: ['./product-filter-bottom-sheet.component.scss'],
})
export class ProductFilterBottomSheetComponent {
  filterList = new SelectedFilterModel();

  dialogConfigs = {
    width: '500px',
    panelClass: 'custom-mat-dialog',
    enterAnimationDuration: '100ms',
    exitAnimationDuration: '100ms',
    autoFocus: false,
  };

  constructor(private _bottomSheet: MatBottomSheet, public dialog: MatDialog) {}

  openCategoryDialog() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      ...this.dialogConfigs,
      data: this.filterList.categories,
    });
    dialogRef
      .afterClosed()
      .pipe(filter((result) => result))
      .subscribe((result: [{ id: number; title: string }]) => {
        this.filterList.categories = [...result];
      });
  }

  openBrandsDialog() {
    const dialogRef = this.dialog.open(BrandsDialogComponent, {
      ...this.dialogConfigs,
      data: this.filterList.brands,
    });
    dialogRef
      .afterClosed()
      .pipe(filter((result) => result))
      .subscribe((result: [{ id: number; title: string }]) => {
        this.filterList.brands = [...result];
      });
  }

  openSellerDialog() {
    const dialogRef = this.dialog.open(SellersDialogComponent, {
      ...this.dialogConfigs,
      data: this.filterList.sellers,
    });
    dialogRef
      .afterClosed()
      .pipe(filter((result) => result))
      .subscribe((result: [{ id: number; title: string }]) => {
        this.filterList.sellers = [...result];
      });
  }

  closeBottomSheet() {
    this._bottomSheet.dismiss();
  }
}
