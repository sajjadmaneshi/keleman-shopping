import { Injectable } from '@angular/core';
import { BasketRepository } from '../data/repositories/basket.repository';
import { AddToCartDto } from '../data/dto/add-to-cart.dto';
import { SnackBarService } from '../../../../shared/components/snack-bar/snack-bar.service';
import { LoadingService } from '../../../../../common/services/loading.service';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { UpdateBasketDto } from '../data/dto/update-basket.dto';
import { BasketViewModel } from '../data/models/basket.view-model';

@Injectable({ providedIn: 'root' })
export class BasketService {
  destroy$ = new Subject<void>();
  productCountInBasket = new BehaviorSubject(0);

  cartCount = new BehaviorSubject(0);

  basketItems = new BehaviorSubject<BasketViewModel | null>(null);
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
        () => {
          this.getCartCount();
          this._showSuccessMessage();
          this.productCountInBasket.next(this.productCountInBasket.value + 1);
        },
        () => this._loadingService.stopLoading('add')
      );
  }

  public updateBasket(dto: UpdateBasketDto) {
    this._loadingService.startLoading('update');
    this._basketRepository
      .updateCart(dto)
      .pipe(
        tap(() => this._loadingService.stopLoading('update')),
        takeUntil(this.destroy$)
      )
      .subscribe(
        () => {
          this.getCartCount();
        },
        () => this._loadingService.stopLoading('update')
      );
  }

  public getCartCount() {
    this._loadingService.startLoading('read');
    this._basketRepository
      .getCartCount()
      .pipe(
        tap(() => this._loadingService.stopLoading('read')),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (res) => {
          this.cartCount.next(res.result!);
        },
        () => this._loadingService.stopLoading('read')
      );
  }

  public getBasket() {
    this._loadingService.startLoading('read');
    this._basketRepository
      .getBasket()
      .pipe(
        tap(() => this._loadingService.stopLoading('read')),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (res) => {
          this.basketItems.next(res.result!);
        },
        () => this._loadingService.stopLoading('read')
      );
  }

  private _showSuccessMessage() {
    this._snackBar.showSuccessSnackBar('محصول با موفقیت به سبد خرید افزوده شد');
  }
}
