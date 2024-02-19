import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { GoToBasketBaseComponent } from '../go-to-basket-base/go-to-basket-base.component';
import { ProductDetailViewModel } from '../../../data/models/view-models/product-detail.view-model';

@Component({
  selector: 'keleman-go-to-basket-dialog',
  standalone: true,
  imports: [MatDialogContent, GoToBasketBaseComponent],
  templateUrl: './go-to-basket-dialog.component.html',
  styleUrl: './go-to-basket-dialog.component.scss',
})
export class GoToBasketDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductDetailViewModel,
    private _dialogRef: MatDialogRef<GoToBasketDialogComponent>
  ) {}

  onClose() {
    this._dialogRef.close();
  }
}
