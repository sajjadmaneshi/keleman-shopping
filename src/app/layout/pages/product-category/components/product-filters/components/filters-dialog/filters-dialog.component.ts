import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  SelectableOption,
  SelectablePropertyModel,
} from '../../../../../products/data/models/view-models/category-property-option.view-model';
import { ProductFilterService } from '../../../../../products/services/product-filter.service';

@Component({
  selector: 'keleman-filters-dialog',
  templateUrl: './filters-dialog.component.html',
  styles: [
    `
      .filter-items {
        max-height: 300px;
        overflow-y: auto;
      }
    `,
  ],
})
export class FiltersDialogComponent implements OnInit {
  selectedItem!: SelectablePropertyModel;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SelectableOption,
    public dialogRef: MatDialogRef<FiltersDialogComponent>,
    public productFilterService: ProductFilterService
  ) {}

  submitValue() {
    this.dialogRef.close(this.selectedItem);
  }

  ngOnInit(): void {
    this._determineSelectableArray();
  }

  private _determineSelectableArray() {
    if (this._isThisOptionInQueryList())
      this.selectedItem = this.productFilterService.determineSelectedArray(
        this.data
      );
  }

  private _isThisOptionInQueryList() {
    return (
      Object.keys(this.productFilterService.queryParams).findIndex(
        (propertyKey: string) => propertyKey === this.data.seoTitle
      ) != -1
    );
  }
}
