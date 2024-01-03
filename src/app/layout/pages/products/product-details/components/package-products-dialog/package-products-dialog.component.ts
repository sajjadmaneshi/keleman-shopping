import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  PackageItemsViewModel,
  PackegeItemGroupViewModel,
  PackegeItemViewModel,
} from '../../../data/models/view-models/package-items.view-model';
import { MatListModule } from '@angular/material/list';
import { LazyLoadingDirective } from '../../../../../../shared/directives/lazy-loading.directive';
import { EmptyImageDirective } from '../../../../../../shared/directives/empty-image.directive';
import { ValueChangerComponent } from '../../../../../../shared/components/value-changer/value-changer.component';
import { LoadingProgressDirective } from '../../../../../../shared/directives/loading-progress.directive';
import { PriceComponent } from '../../../../../../shared/components/price/price.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'keleman-package-products-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatListModule,
    LazyLoadingDirective,
    EmptyImageDirective,
    ValueChangerComponent,
    LoadingProgressDirective,
    MatDialogActions,
    PriceComponent,
    DecimalPipe,
  ],
  templateUrl: './package-products-dialog.component.html',
  styleUrl: './package-products-dialog.component.scss',
})
export class PackageProductsDialogComponent {
  totalPrice = 0;
  packageDatas: PackegeItemGroupViewModel[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PackageItemsViewModel,
    private _dialogRef: MatDialogRef<PackageProductsDialogComponent>
  ) {
    this.packageDatas = [...data.items];
    this.totalPrice = data.totalPrice;
  }

  canDecrease(packageGroup: PackegeItemGroupViewModel) {
    const totalCount = packageGroup.items.reduce(
      (sum, current) => sum + current.amount,
      0
    );
    packageGroup.items.map(
      (x) => (x.canDecrease = totalCount > packageGroup.minValue)
    );
  }
  increaseDecrease(
    amount: number,
    packageItem: PackegeItemViewModel,
    packageGroup: PackegeItemGroupViewModel
  ) {
    if (packageGroup.isSameValue)
      packageGroup.items.map((x) => (x.amount = amount));
    else packageItem.amount = amount;
    this._calculatePackagePrice();
    this.canDecrease(packageGroup);
  }

  private _calculatePackagePrice() {
    this.totalPrice = this.data.items.reduce((sum, currentValue) => {
      return (
        sum +
        currentValue.items.reduce((sum2, currentValue2) => {
          return sum2 + currentValue2.priceAfterDiscount * currentValue2.amount;
        }, 0)
      );
    }, 0);
  }

  submit() {
    this._dialogRef.close(this.data);
  }
}
