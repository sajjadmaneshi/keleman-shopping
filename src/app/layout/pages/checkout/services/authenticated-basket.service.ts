import { Injectable } from '@angular/core';
import { BasketRepository } from '../data/repositories/basket.repository';
import { AddToCartDto } from '../data/dto/add-to-cart.dto';

import { LoadingService } from '../../../../../common/services/loading.service';
import { catchError, map, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { UpdateBasketDto } from '../data/dto/update-basket.dto';
import { BasketCheckoutViewModel } from '../data/models/basket-checkout.view-model';
import { BillRepository } from '../data/repositories/bill.repository';
import { PaymentRepository } from '../data/repositories/payment.repository';
import { MergeBasketDto } from '../data/dto/merge-basket.dto';
import { BasketItemViewModel } from '../data/models/basket-item.view-model';
import { MergeResultViewModel } from '../data/models/merge-result.view-model';
import { HttpClientResult } from '../../../../shared/data/models/http/http-client.result';
import { PackageItemsViewModel } from '../../products/data/models/view-models/package-items.view-model';
import { InBasketCountViewModel } from '../data/models/in-basket-count.view-model';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticatedBasketService {
  destroy$ = new Subject<void>();

  constructor(
    private readonly _basketRepository: BasketRepository,
    private readonly _billRepository: BillRepository,
    private readonly _paymentRepository: PaymentRepository,
    private readonly _loadingService: LoadingService
  ) {}

  public addToBasket(dto: AddToCartDto): Observable<boolean> {
    this._loadingService.startLoading('add', 'addToBasket');
    return this._basketRepository.addToCart(dto).pipe(
      tap(() => this._loadingService.stopLoading('add', 'addToBasket')),
      takeUntil(this.destroy$),
      map((result) => result.result!),
      catchError(() => {
        this._loadingService.stopLoading('add', 'addToBasket');
        return of(false);
      })
    );
  }

  public updateBasket(dto: UpdateBasketDto): Observable<boolean> {
    this._loadingService.startLoading('update', 'updateBasket');
    return this._basketRepository.updateCart(dto).pipe(
      tap(() => this._loadingService.stopLoading('update', 'updateBasket')),
      takeUntil(this.destroy$),
      map((result) => result.result!),
      catchError(() => {
        this._loadingService.stopLoading('update', 'updateBasket');
        return of(false);
      })
    );
  }

  public getCartCount() {
    this._loadingService.startLoading('read', 'cartCount');
    return this._basketRepository.getCartCount().pipe(
      tap(() => this._loadingService.stopLoading('read', 'cartCount')),
      takeUntil(this.destroy$),
      map((x) => x.result!),
      catchError(() => {
        this._loadingService.stopLoading('read', 'cartCount');
        return of(0);
      })
    );
  }

  public getPaymentGateways() {
    this._loadingService.startLoading('read', 'paymentGateway');
    return this._paymentRepository.getPaymentGateways().pipe(
      tap(() => this._loadingService.stopLoading('read', 'paymentGateway')),
      takeUntil(this.destroy$),
      map((x) => x.result!),
      catchError(() => {
        this._loadingService.stopLoading('read', 'paymentGateway');
        return of([]);
      })
    );
  }

  public pay(billId: number, bankId: number) {
    this._loadingService.startLoading('read', 'pay');
    return this._paymentRepository.pay(billId, bankId).pipe(
      tap(() => this._loadingService.stopLoading('read', 'pay')),
      take(1),
      map((x) => {
        return x.result!;
      }),
      catchError(() => {
        this._loadingService.stopLoading('read', 'pay');
        return of(undefined);
      })
    );
  }

  public inBasketCount(
    productId: number
  ): Observable<InBasketCountViewModel[]> {
    this._loadingService.startLoading('read', 'inBasketCount');
    return this._basketRepository.isInCart(productId).pipe(
      tap(() => this._loadingService.stopLoading('read', 'inBasketCount')),
      takeUntil(this.destroy$),
      map((result) => result.result || []),
      catchError(() => {
        this._loadingService.stopLoading('read', 'inBasketCount');
        return of([]);
      })
    );
  }

  public getBasket(): Observable<BasketItemViewModel[]> {
    this._loadingService.startLoading('read', 'getBasket');
    return this._basketRepository.getBasket().pipe(
      tap(() => this._loadingService.stopLoading('read', 'getBasket')),
      takeUntil(this.destroy$),
      map((result) => result.result!),
      catchError(() => {
        this._loadingService.stopLoading('read', 'getBasket');
        return of([]);
      })
    );
  }
  public getBasketCheckout() {
    this._loadingService.startLoading('read', 'getCheckout');
    return this._basketRepository.getBasketCheckout().pipe(
      tap(() => this._loadingService.stopLoading('read', 'getCheckout')),
      takeUntil(this.destroy$),
      map((result) => result.result!),
      catchError(() => {
        this._loadingService.stopLoading('read', 'getCheckout');
        return of(new BasketCheckoutViewModel(0, 0, 0, 0));
      })
    );
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
    return this._billRepository.getBillInvoice(billId).pipe(
      tap(() => this._loadingService.stopLoading('read', 'billInvoice')),
      takeUntil(this.destroy$),
      map((result) => result.result!),
      catchError(() => {
        this._loadingService.stopLoading('read', 'getCheckout');
        return of(new BasketCheckoutViewModel(0, 0, 0, 0));
      })
    );
  }

  getPackageDetails(packageId: number) {
    this._loadingService.startLoading('read', 'packageDetails');
    return this._basketRepository.getPackageDetails(packageId).pipe(
      tap(() => this._loadingService.stopLoading('read', 'packageDetails')),
      takeUntil(this.destroy$),
      map((x) => x.result!),
      catchError(() => {
        this._loadingService.stopLoading('read', 'packageDetails');
        return of(undefined);
      })
    );
  }

  public mergeBasket(
    dto: MergeBasketDto[]
  ): Observable<MergeResultViewModel[]> {
    this._loadingService.startLoading('read', 'merge');
    return this._basketRepository.mergeCart(dto).pipe(
      tap(() => this._loadingService.stopLoading('read', 'merge')),
      takeUntil(this.destroy$),
      map((result) => result.result!),
      catchError(() => {
        this._loadingService.stopLoading('read', 'merge');
        return of([]);
      })
    );
  }
}
