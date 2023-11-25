import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { ProductViewModel } from '../../../products/data/models/view-models/product.view-model';
import { FavoriteProductViewModel } from '../../data/view-models/favorite-product.view-model';
import { AlertDialogComponent } from '../../../../../shared/components/alert-dialog/alert-dialog.component';
import { AlertDialogDataModel } from '../../../../../shared/components/alert-dialog/alert-dialog-data.model';
import { ProfileRepository } from '../../data/profile.repository';
import { ProductRepository } from '../../../products/data/repositories/product.repository';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'keleman-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.scss'],
})
export class FavoriteItemComponent implements OnDestroy {
  @Input() productDetails!: FavoriteProductViewModel;
  @Output() disLike = new EventEmitter<number>();
  isLoading = false;

  destroy$ = new Subject<void>();

  dialogRef!: MatDialogRef<AlertDialogComponent>;

  constructor(
    private readonly _profileRepository: ProfileRepository,
    private readonly _productRepository: ProductRepository,
    private _alertDialog: MatDialog
  ) {}

  public getAcceptBeforeRemoveFromFavorite($event: any) {
    $event.stopPropagation();
    this.dialogRef = this._alertDialog.open(AlertDialogComponent, {
      autoFocus: false,
      data: {
        message: 'آیا  از حذف کالا از لیست علاقه مندی ها مطمئن می باشید؟',
        callBackButtonText: 'حذف کالا',
        cancelButtonText: 'انصراف',
        callBackFunction: () => this._removeFromFavorites(),
      } as AlertDialogDataModel,
    });
  }
  private _removeFromFavorites() {
    this._productRepository
      .favorite(this.productDetails.id)
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.dialogRef.close();
        this.disLike.emit(this.productDetails.id);
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
