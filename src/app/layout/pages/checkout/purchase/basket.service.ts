import { Injectable } from '@angular/core';
import { BasketRepository } from '../data/repositories/basket.repository';
import { AddToCartDto } from '../data/dto/add-to-cart.dto';
import { SnackBarService } from '../../../../shared/components/snack-bar/snack-bar.service';
import { LoadingService } from '../../../../../common/services/loading.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Injectable()
export class BasketService {
  destroy$ = new Subject<void>();
  constructor(
    private readonly _basketRepository: BasketRepository,
    private readonly _snackBar: SnackBarService,
    private readonly _loadingService: LoadingService
  ) {}

  public addToBasket(dto: AddToCartDto) {
    this._loadingService.startLoading('add');
    this._basketRepository
      .addToCart(dto)
      .pipe(
        tap(() => this._loadingService.stopLoading('add')),
        takeUntil(this.destroy$)
      )
      .subscribe(
        () => this._showSuccessMessage(),
        () => this._loadingService.stopLoading('add')
      );
  }

  private _showSuccessMessage() {
    this._snackBar.showSuccessSnackBar('محصول با موفقیت به سبد خرید افزوده شد');
  }
}
