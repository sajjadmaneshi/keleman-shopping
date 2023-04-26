import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ProductFilterService } from '../../../../product-filter.service';

@Component({
  selector: 'keleman-sellers-dialog',
  templateUrl: './sellers-dialog.component.html',
  styleUrls: ['../../../shared/filter-items.scss'],
})
export class SellersDialogComponent {
  selectedArray: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any[],
    public dialogRef: MatDialogRef<SellersDialogComponent>,
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
