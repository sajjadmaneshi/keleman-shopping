import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

import { ApplicationStateService } from '../../../../../shared/services/application-state.service';
import { BasketItemViewModel } from '../../data/models/basket-item.view-model';
import { UpdateBasketDto } from '../../data/dto/update-basket.dto';
import { AuthService } from '../../../../../shared/services/auth/auth.service';
import { BasketService } from '../../services/basket.service';
import { LoadingService } from '../../../../../../common/services/loading.service';
import { of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { PackageItemsViewModel } from '../../../products/data/models/view-models/package-items.view-model';
import { PackageProductsDialogComponent } from '../../../products/product-details/components/package-products-dialog/package-products-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss'],
})
export class BasketItemComponent implements OnDestroy {
  @Input() basketItem!: BasketItemViewModel;
  @Output() remove = new EventEmitter<BasketItemViewModel>();
  isLoggedIn = false;
  destroy$ = new Subject<void>();
  packageItems!: PackageItemsViewModel;
  constructor(
    public readonly applicationStateService: ApplicationStateService,
    public readonly loadingService: LoadingService,
    private readonly _basketService: BasketService,
    private readonly _authService: AuthService,
    private readonly _dialog: MatDialog
  ) {
    this._authService.isLoggedIn$
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.isLoggedIn = result;
      });
  }

  removeProduct() {
    const id = this.isLoggedIn
      ? this.basketItem.id!
      : this.basketItem.product.id;

    this._basketService
      .remove(id, this.basketItem.product.seller.id)
      .then((result) => {
        if (result) this.remove.emit(this.basketItem);
      });
  }

  updateBasket(count: number) {
    const dto = {
      productId: this.basketItem.product.id,
      storeId:
        this.basketItem.product.seller.id === 0
          ? null
          : this.basketItem.product.seller.id,
      count,
      packageDetailItems: this.packageItems
        ? this.packageItems.items
            .map((x) => {
              return x.items.map((y) => {
                return { id: y.productId, count: y.amount };
              });
            })
            .flat(Infinity)
        : undefined,
    } as UpdateBasketDto;
    return this._basketService.updateBasket(dto);
  }

  getPackageDetails() {
    this.loadingService.startLoading('read', 'basketPackageItems');
    this._basketService
      .getPackageDetails(this.basketItem.product.id!)
      .pipe(
        tap(() =>
          this.loadingService.stopLoading('read', 'basketPackageItems')
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => {
          this.openPackageDetailDialog(result!);
        },
        error: () =>
          this.loadingService.stopLoading('read', 'basketPackageItems'),
      });
  }

  openPackageDetailDialog(data: PackageItemsViewModel) {
    const dialogRef = this._dialog.open(PackageProductsDialogComponent, {
      width: '500px',
      autoFocus: false,
      data: this.packageItems || data,
    });
    dialogRef.componentInstance.dialogSubmit
      .pipe(
        takeUntil(this.destroy$),
        switchMap((result: PackageItemsViewModel) => {
          this.packageItems = result;
          return of(this.updateBasket(1));
        })
      )
      .subscribe((response: boolean) => {
        if (response) {
          this._basketService.basket();
          dialogRef.close();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
