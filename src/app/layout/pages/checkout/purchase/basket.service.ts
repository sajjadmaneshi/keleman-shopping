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
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { UpdateBasketDto } from '../data/dto/update-basket.dto';
import { BasketItemViewModel } from '../data/models/basket-item.view-model';
import { BasketCheckoutViewModel } from '../data/models/basket-checkout.view-model';
import { PaymentGatewayViewModel } from '../data/models/payment-gateway.view-model';
import { GuestBasketService } from '../guest-basket.service';
import { MergeBasketDto } from '../data/dto/merge-basket.dto';
import { ShippingCostViewModel } from '../data/models/shipping-cost-view.model';
import { BillRepository } from '../data/repositories/bill.repository';
import { PaymentRepository } from '../data/repositories/payment.repository';
import { PayResultViewModel } from '../data/models/pay-result.view-model';

@Injectable({ providedIn: 'root' })
export class BasketService {
  destroy$ = new Subject<void>();
  productCountInBasket = new BehaviorSubject(0);
  cartCount = new BehaviorSubject(0);
  basketItems = new BehaviorSubject<BasketItemViewModel[]>([]);
  shippingCost = new BehaviorSubject<ShippingCostViewModel | undefined>(
    undefined
  );
  paymentGateways = new BehaviorSubject<PaymentGatewayViewModel[]>([]);
  basketCheckout = new BehaviorSubject<BasketCheckoutViewModel>(
    new BasketCheckoutViewModel(0, 0, 0, 0)
  );
  delivaryAddress = new BehaviorSubject<number | undefined>(undefined);
  payResult = new BehaviorSubject<PayResultViewModel | undefined>(undefined);

  constructor(
    private readonly _basketRepository: BasketRepository,
    private readonly _billRepository: BillRepository,
    private readonly _paymentRepository: PaymentRepository,
    private readonly _guestBasketService: GuestBasketService,
    private readonly _snackBar: SnackBarService,
    private readonly _loadingService: LoadingService
  ) {}

  public addToBasket(dto: AddToCartDto) {
    this._loadingService.startLoading('add', 'addToBasket');
    this._basketRepository
      .addToCart(dto)
      .pipe(
        tap(() => this._loadingService.stopLoading('add', 'addToBasket')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.getCartCount();
          this._showSuccessMessage();
          this.productCountInBasket.next(this.productCountInBasket.value + 1);
        },
        error: () => this._loadingService.stopLoading('add', 'addToBasket'),
      });
  }

  public updateBasket(dto: UpdateBasketDto) {
    this._loadingService.startLoading('update', 'updateBasket');
    this._basketRepository
      .updateCart(dto)
      .pipe(
        tap(() => this._loadingService.stopLoading('update', 'updateBasket')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.getCartCount();
          this.getBasketCheckout();
          if (dto.count === 0) this.getBasket();
        },
        error: () => this._loadingService.stopLoading('update', 'updateBasket'),
      });
  }

  public getShippingCost(addressId: number) {
    this._loadingService.startLoading('read', 'shippingCost');
    this._billRepository
      .getShippingCost(addressId)
      .pipe(
        tap(() => this._loadingService.stopLoading('read', 'shoppingCost')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => this.shippingCost.next(result.result!),
        error: () => this._loadingService.stopLoading('read', 'shoppingCost'),
      });
  }

  public getCartCount() {
    this._loadingService.startLoading('read', 'cartCount');
    this._basketRepository
      .getCartCount()
      .pipe(
        tap(() => this._loadingService.stopLoading('read', 'cartCount')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res) => {
          this.cartCount.next(res.result!);
        },
        error: () => this._loadingService.stopLoading('read', 'cartCount'),
      });
  }

  public getPaymentGateways() {
    this._loadingService.startLoading('read', 'paymentGateway');
    this._paymentRepository
      .getPaymentGateways()
      .pipe(
        tap(() => this._loadingService.stopLoading('read', 'paymentGateway')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res) => {
          this.paymentGateways.next(res.result!);
        },
        error: () => this._loadingService.stopLoading('read', 'paymentGateway'),
      });
  }

  public pay(billId: number, bankId: number) {
    this._loadingService.startLoading('read', 'pay');
    this._paymentRepository
      .pay(billId, bankId)
      .pipe(
        tap(() => this._loadingService.stopLoading('read', 'pay')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => this.payResult.next(result.result!),
        error: () => this._loadingService.stopLoading('read', 'pay'),
      });
  }

  public inBasketCount(
    productId: number,
    storeId?: number
  ): Observable<number> {
    this._loadingService.startLoading('read', 'inBasketCount');
    return this._basketRepository.isInCart(productId, storeId).pipe(
      tap(() => this._loadingService.stopLoading('read', 'inBasketCount')),
      takeUntil(this.destroy$),
      map((result) => result.result || 0),
      catchError(() => {
        this._loadingService.stopLoading('read', 'inBasketCount');
        return of(0);
      })
    );
  }

  public mergeBasket(): Observable<boolean> {
    return this._guestBasketService.basket$.pipe(
      switchMap((basket) => {
        const mergeDto = basket.items.map((x) => {
          return {
            productId: x.product.id,
            storeId: 0,
            count: x.count,
          } as MergeBasketDto;
        });

        return this._basketRepository
          .mergeCart(mergeDto)
          .pipe(map((result) => result.result!));
      })
    );
  }

  public getBasket() {
    this._loadingService.startLoading('read', 'getBasket');

    this._basketRepository
      .getBasket()
      .pipe(
        tap(() => this._loadingService.stopLoading('read', 'getBasket')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => {
          this.basketItems.next(result.result!);
        },
        error: () => this._loadingService.stopLoading('read', 'getBasket'),
      });
  }
  public getBasketCheckout() {
    this._loadingService.startLoading('read', 'getCheckout');
    this._basketRepository
      .getBasketCheckout()
      .pipe(
        tap(() => this._loadingService.stopLoading('read', 'getCheckout')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res) => {
          this.basketCheckout.next(res.result!);
        },
        error: () => this._loadingService.stopLoading('read', 'getCheckout'),
      });
  }

  public remove(orderId: number) {
    this._loadingService.startLoading('delete', 'deleteBasket');
    return this._basketRepository.removeFromCart(orderId).pipe(
      tap(() => this._loadingService.stopLoading('delete', 'deleteBasket')),
      takeUntil(this.destroy$),
      map((result) => result.result!),
      catchError(() => {
        this._loadingService.stopLoading('delete', 'deleteBasket');
        return of(false);
      })
    );
  }
  getBillInvoice(billId: number) {
    this._loadingService.startLoading('read', 'billInvoice');
    this._billRepository
      .getBillInvoice(billId)
      .pipe(
        tap(() => this._loadingService.stopLoading('read', 'billInvoice')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => this.basketCheckout.next(result.result!),
        error: () => this._loadingService.stopLoading('read', 'billInvoice'),
      });
  }

  public resetBasket() {
    this.basketItems.next([]);
    this.cartCount.next(0);
    this.basketCheckout.next(new BasketCheckoutViewModel(0, 0, 0, 0));
    this.shippingCost.next(new ShippingCostViewModel(0, 0));
  }

  private _showSuccessMessage() {
    this._snackBar.showSuccessSnackBar('محصول با موفقیت به سبد خرید افزوده شد');
  }
}
