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
import { Subject, takeUntil, tap } from 'rxjs';
import { BasketRepository } from '../../data/repositories/basket.repository';
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
    private readonly _basketRepository: BasketRepository,
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

    this._basketService.remove(id).then((result) => {
      if (result) this.remove.emit(this.basketItem);
    });
  }

  updateBasket(count: number) {
    const dto = {
      productId: this.basketItem.product.id,
      // storeId: this.productDetail.stores[0].id,
      count,
    } as UpdateBasketDto;
    this._basketService.updateBasket(dto);
  }

  getPackageDetails() {
    this.loadingService.startLoading('read', 'basketPackageItems');
    this._basketRepository
      .getPackageDetails(this.basketItem.product.id!)
      .pipe(
        tap(() =>
          this.loadingService.stopLoading('read', 'basketPackageItems')
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => {
          this.openPackageDetailDialog(result.result!);
        },
        error: () =>
          this.loadingService.stopLoading('read', 'basketPackageItems'),
      });
  }

  openPackageDetailDialog(data: PackageItemsViewModel) {
    this._dialog
      .open(PackageProductsDialogComponent, {
        width: '500px',
        autoFocus: false,
        data: this.packageItems || data,
      })
      .afterClosed()
      .subscribe((result: PackageItemsViewModel) => {
        this.packageItems = result;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
