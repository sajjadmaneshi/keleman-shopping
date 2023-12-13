import { Injectable } from '@angular/core';
import { BasketRepository } from '../data/repositories/basket.repository';
import { AddToCartDto } from '../data/dto/add-to-cart.dto';
import { SnackBarService } from '../../../../shared/components/snack-bar/snack-bar.service';
import { LoadingService } from '../../../../../common/services/loading.service';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { UpdateBasketDto } from '../data/dto/update-basket.dto';
import { BasketItemViewModel } from '../data/models/basket-item.view-model';
import { BasketCheckoutViewModel } from '../data/models/basket-checkout.view-model';
import { PaymentGatewayViewModel } from '../data/models/payment-gateway.view-model';
import { PaymentGatewayRepository } from '../data/repositories/payment-gateway.repository';

@Injectable({ providedIn: 'root' })
export class BasketService {
  destroy$ = new Subject<void>();
  productCountInBasket = new BehaviorSubject(0);

  cartCount = new BehaviorSubject(0);

  basketItems = new BehaviorSubject<BasketItemViewModel[]>([]);
  paymentGateways = new BehaviorSubject<PaymentGatewayViewModel[]>([]);

  basketCheckout = new BehaviorSubject<BasketCheckoutViewModel>(
    new BasketCheckoutViewModel(0, 0, 0)
  );
  constructor(
    private readonly _basketRepository: BasketRepository,
    private readonly _paymentGatewayrepository: PaymentGatewayRepository,
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

  public getPaymentGateways() {
    this._loadingService.startLoading('read');
    this._paymentGatewayrepository
      .getPaymentGateways()
      .pipe(
        tap(() => this._loadingService.stopLoading('read')),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (res) => {
          this.paymentGateways.next(res.result!);
        },
        () => this._loadingService.stopLoading('read')
      );
  }

  public inBasketCount(
    productId: number,
    storeId?: number
  ): Observable<number> {
    this._loadingService.startLoading('read');
    return this._basketRepository.isInCart(productId, storeId).pipe(
      tap(() => this._loadingService.stopLoading('read')),
      takeUntil(this.destroy$),
      map((result) => result.result || 0),
      catchError(() => {
        this._loadingService.stopLoading('read');
        return of(0);
      })
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
  public getBasketCheckout() {
    this._loadingService.startLoading('read');
    this._basketRepository
      .getBasketCheckout()
      .pipe(
        tap(() => this._loadingService.stopLoading('read')),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (res) => {
          this.basketCheckout.next(res.result!);
        },
        () => this._loadingService.stopLoading('read')
      );
  }

  public remove(orderId: number) {
    this._loadingService.startLoading('delete');
    return this._basketRepository.removeFromCart(orderId).pipe(
      tap(() => this._loadingService.stopLoading('delete')),
      takeUntil(this.destroy$),
      map((result) => result.result!),
      catchError(() => {
        this._loadingService.stopLoading('delete');
        return of(false);
      })
    );
  }

  private _showSuccessMessage() {
    this._snackBar.showSuccessSnackBar('محصول با موفقیت به سبد خرید افزوده شد');
  }
}
