import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductFilterService } from '../../../../product-filter.service';

@Component({
  selector: 'keleman-brands-dialog',
  templateUrl: './brands-dialog.component.html',
  styleUrls: ['../../../shared/filter-items.scss'],
})
export class BrandsDialogComponent {
  selectedArray: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any[],
    public dialogRef: MatDialogRef<BrandsDialogComponent>,
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
