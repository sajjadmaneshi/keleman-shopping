import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductFilterService } from '../../../../product-filter.service';
import {
  SelectableOption,
  SelectablePropertyModel,
} from '../../../../../../data/models/view-models/category-property-option.view-model';

@Component({
  selector: 'keleman-filters-dialog',
  templateUrl: './filters-dialog.component.html',
  styleUrls: ['../../../components/filter-items.scss'],
})
export class FiltersDialogComponent {
  selectedArray: SelectablePropertyModel[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SelectableOption,
    public dialogRef: MatDialogRef<FiltersDialogComponent>,
    public productFilterService: ProductFilterService
  ) {}

  submit() {
    this.dialogRef.close(this.selectedArray);
  }
}
