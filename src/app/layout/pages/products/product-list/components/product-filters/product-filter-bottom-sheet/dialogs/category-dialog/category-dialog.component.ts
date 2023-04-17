import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductFilterService } from '../../../../product-filter.service';
import { ProductsModule } from '../../../../../../products.module';
import { MatComponentsModule } from '../../../../../../../../../mat-components.module';
import { CategoryFilterItemsComponent } from '../../../shared/category-filter-items/category-filter-items.component';

@Component({
  selector: 'keleman-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['../../../shared/filter-items.scss'],
})
export class CategoryDialogComponent {
  selectedArray: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any[],
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    public productFilterService: ProductFilterService
  ) {}

  selectionChange($event: any) {
    this.selectedArray = this.productFilterService.manageSelectedArray(
      $event,
      this.selectedArray
    );
  }

  submit() {
    this.dialogRef.close(this.selectedArray);
  }
}
