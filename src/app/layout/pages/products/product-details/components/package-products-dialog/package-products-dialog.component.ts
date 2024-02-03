import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  PackageItemsViewModel,
  PackageItemGroupViewModel,
  PackegeItemViewModel,
} from '../../../data/models/view-models/package-items.view-model';
import { MatListModule } from '@angular/material/list';
import { LazyLoadingDirective } from '../../../../../../shared/directives/lazy-loading.directive';
import { EmptyImageDirective } from '../../../../../../shared/directives/empty-image.directive';
import { ValueChangerComponent } from '../../../../../../shared/components/value-changer/value-changer.component';
import { LoadingProgressDirective } from '../../../../../../shared/directives/loading-progress.directive';
import { PriceComponent } from '../../../../../../shared/components/price/price.component';
import { DecimalPipe } from '@angular/common';
import { AuthService } from '../../../../../../shared/services/auth/auth.service';
import { AlertDialogComponent } from '../../../../../../shared/components/alert-dialog/alert-dialog.component';
import { Routing } from '../../../../../../routing';
import { AlertDialogDataModel } from '../../../../../../shared/components/alert-dialog/alert-dialog-data.model';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

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
  packageDatas: PackageItemGroupViewModel[] = [];
  isLoggedIn = false;
  @Output() dialogSubmit = new EventEmitter<PackageItemsViewModel>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PackageItemsViewModel,
    private _authService: AuthService,
    private _dialog: MatDialog,
    private _router: Router
  ) {
    this.packageDatas = [...data.items];
    this.totalPrice = data.totalPrice;
    this._authService.isLoggedIn$.pipe(take(1)).subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.packageDatas.forEach(this.canDecrease);
  }

  canDecrease(packageGroup: PackageItemGroupViewModel) {
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
    packageGroup: PackageItemGroupViewModel
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

  openRegisterBeforeActionDialog() {
    this._dialog.open(AlertDialogComponent, {
      data: {
        message: 'لطفا برای افزودن پکیج به سبد خرید ابتدا وارد سایت شوید',
        callBackButtonText: 'واردشوید',
        callBackFunction: () => {
          this._dialog.closeAll();
          this._router.navigate([Routing.register], {
            queryParams: {
              redirectUrl: this._router.routerState.snapshot.url,
              openAddCommentDialog: false,
            },
          });
        },
      } as AlertDialogDataModel,
    });
  }

  submit() {
    if (this.isLoggedIn) {
      this.dialogSubmit.emit(this.data);
    } else this.openRegisterBeforeActionDialog();
  }
}
