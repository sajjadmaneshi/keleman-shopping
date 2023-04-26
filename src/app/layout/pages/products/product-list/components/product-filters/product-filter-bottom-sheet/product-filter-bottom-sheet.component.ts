import { ChangeDetectorRef, Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from './dialogs/category-dialog/category-dialog.component';
import { BrandsDialogComponent } from './dialogs/brands-dialog/brands-dialog.component';
import { SellersDialogComponent } from './dialogs/sellers-dialog/sellers-dialog.component';
import { filter } from 'rxjs';
import { PriceRange } from '../components/product-price-filter/product-price-filter.component';
import { ProductFilterService } from '../../product-filter.service';

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

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _cr: ChangeDetectorRef,
    public dialog: MatDialog,
    public productFilterService: ProductFilterService
  ) {}

  openCategoryDialog() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      ...this.dialogConfigs,
      data: this.productFilterService.filterList.categories,
    });
    dialogRef
      .afterClosed()
      .pipe(filter((result) => result))
      .subscribe((result: [{ id: number; title: string }]) => {
        this.productFilterService.filterList.categories = [...result];
      });
  }

  openBrandsDialog() {
    const dialogRef = this.dialog.open(BrandsDialogComponent, {
      ...this.dialogConfigs,
      data: this.productFilterService.filterList.brands,
    });
    dialogRef
      .afterClosed()
      .pipe(filter((result) => result))
      .subscribe((result: [{ id: number; title: string }]) => {
        this.productFilterService.filterList.brands = [...result];
      });
  }

  openSellerDialog() {
    const dialogRef = this.dialog.open(SellersDialogComponent, {
      ...this.dialogConfigs,
      data: this.productFilterService.filterList.sellers,
    });
    dialogRef
      .afterClosed()
      .pipe(filter((result) => result))
      .subscribe((result: [{ id: number; title: string }]) => {
        this.productFilterService.filterList.sellers = [...result];
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
}
