import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ProductFilterService } from '../../../../product-filter.service';
import { ProductsModule } from '../../../../../../products.module';
import { MatComponentsModule } from '../../../../../../../../../mat-components.module';
import { SellerFilterItemsComponent } from '../../../shared/seller-filter-items/seller-filter-items.component';

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
