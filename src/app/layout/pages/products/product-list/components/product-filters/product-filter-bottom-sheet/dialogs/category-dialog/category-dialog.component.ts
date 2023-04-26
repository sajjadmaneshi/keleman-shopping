import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductFilterService } from '../../../../product-filter.service';

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
