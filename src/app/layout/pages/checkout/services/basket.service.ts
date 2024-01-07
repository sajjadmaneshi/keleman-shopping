import { AuthenticatedBasketService } from './authenticated-basket.service';
import { GuestBasketService } from './guest-basket.service';
import { AddToCartDto } from '../data/dto/add-to-cart.dto';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { BasketItemViewModel } from '../data/models/basket-item.view-model';
import { BehaviorSubject } from 'rxjs';
import { UpdateBasketDto } from '../data/dto/update-basket.dto';
import { MergeBasketDto } from '../data/dto/merge-basket.dto';
import { BasketCheckoutViewModel } from '../data/models/basket-checkout.view-model';
import { ShippingCostViewModel } from '../data/models/shipping-cost.view-model';
import { PaymentGatewayViewModel } from '../data/models/payment-gateway.view-model';
import { PayResultViewModel } from '../data/models/pay-result.view-model';
import { Injectable } from '@angular/core';
import { SnackBarService } from '../../../../shared/components/snack-bar/snack-bar.service';
import { MergeResultViewModel } from '../data/models/merge-result.view-model';

@Injectable({ providedIn: 'root' })
export class BasketService {
  isLoggedIn$ = false;
  productCountInBasket$ = new BehaviorSubject(0);
  cartCount$ = new BehaviorSubject(0);
  basketItems$ = new BehaviorSubject<BasketItemViewModel[]>([]);
  shippingCost$ = new BehaviorSubject<ShippingCostViewModel | undefined>(
    undefined
  );
  paymentGateways$ = new BehaviorSubject<PaymentGatewayViewModel[]>([]);
  basketCheckout$ = new BehaviorSubject<BasketCheckoutViewModel>(
    new BasketCheckoutViewModel(0, 0, 0, 0)
  );
  payResult$ = new BehaviorSubject<PayResultViewModel | undefined>(undefined);
  billId = new BehaviorSubject<number | undefined>(undefined);
  mergeResult = new BehaviorSubject<MergeResultViewModel[] | undefined>(
    undefined
  );
  selectedPaymentGateWay = new BehaviorSubject<number>(-1);
  readyForPay = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly _authenticatedBasketService: AuthenticatedBasketService,
    private readonly _guestBasketService: GuestBasketService,
    private readonly _authService: AuthService,
    private readonly _snackBar: SnackBarService
  ) {
    this._authService.isLoggedIn$.subscribe((result) => {
      this.isLoggedIn$ = result;
    });
  }

  public addToBasket(input: {
    authBasketItem?: AddToCartDto;
    guestBasketItem?: BasketItemViewModel;
  }): boolean {
    let addresult = true;
    if (this.isLoggedIn$)
      this._authenticatedBasketService
        .addToBasket(input.authBasketItem!)
        .subscribe((result) => {
          addresult = result;
          if (result) {
            this.cartBalance();
            this._showSuccessMessage();
          }
        });
    else {
      this._guestBasketService.addToBasket(input.guestBasketItem!);
      this.cartCount$.next(this._guestBasketService.cartBalance);
    }
    if (addresult) {
      this.productCountInBasket$.next(this.productCountInBasket$.value + 1);
    }
    return addresult;
  }

  public updateBasket(updateDto: UpdateBasketDto) {
    let updateResult = true;
    if (this.isLoggedIn$) {
      this._authenticatedBasketService
        .updateBasket(updateDto)
        .subscribe((result) => {
          updateResult = result;
          if (updateResult) this.handleUpdateSuccess(updateDto.count);
        });
    } else {
      this._guestBasketService.updateBasket(updateDto);
      this.handleUpdateSuccess(updateDto.count);
    }
    return updateResult;
  }

  private handleUpdateSuccess(count: number) {
    if (count === 0) {
      this.basket();
      this.productCountInBasket$.next(0);
    }

    this.cartBalance();
    this.checkout();
  }

  public mergeBasket(): void {
    this._guestBasketService.basket$.subscribe((y) => {
      const mergeDto = y.items.map((x) => {
        return {
          productId: x.product.id,
          storeId: 0,
          count: x.count,
        } as MergeBasketDto;
      });

      this._authenticatedBasketService
        .mergeBasket(mergeDto)
        .subscribe((res) => {
          if (res) {
            localStorage.removeItem('GUEST_BASKET');
            localStorage.setItem('MERGED_BASKET', 'true');
            this.basket();
            this.cartBalance();
            this.mergeResult.next(res);
          }
        });
    });
  }

  cartBalance() {
    if (this.isLoggedIn$) {
      this._authenticatedBasketService.getCartCount().subscribe((result) => {
        this.cartCount$.next(result);
      });
    } else {
      this.cartCount$.next(this._guestBasketService.cartBalance);
    }
  }

  paymentGateways() {
    if (this.isLoggedIn$)
      this._authenticatedBasketService
        .getPaymentGateways()
        .subscribe((result) => this.paymentGateways$.next(result));
  }

  getPackageDetails(packageId: number) {
    return this._authenticatedBasketService.getPackageDetails(packageId);
  }

  pay(billId: number, bankId: number) {
    if (this.isLoggedIn$)
      this._authenticatedBasketService
        .pay(billId, bankId)
        .subscribe((result) => this.payResult$.next(result));
  }

  inBasketCount(productId: number, storeId?: number) {
    if (this.isLoggedIn$) {
      this._authenticatedBasketService
        .inBasketCount(productId, storeId)
        .subscribe((result) => this.productCountInBasket$.next(result));
    } else {
      this.productCountInBasket$.next(
        this._guestBasketService.getProductCountInBasket(productId)
      );
    }
  }

  basket() {
    if (this.isLoggedIn$) {
      this._authenticatedBasketService
        .getBasket()
        .subscribe((result) => this.basketItems$.next(result));
    } else {
      this._guestBasketService.basket$.subscribe((result) => {
        this.basketItems$.next(result.items);
      });
    }
  }

  checkout() {
    if (this.isLoggedIn$) {
      this._authenticatedBasketService
        .getBasketCheckout()
        .subscribe((result) => this.basketCheckout$.next(result));
    } else {
      this.basketCheckout$.next(this._guestBasketService.calculateCheckout());
    }
  }

  remove(id: number): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.isLoggedIn$) {
        this._authenticatedBasketService
          .remove(id)
          .subscribe((result) => resolve(result));
      } else {
        this._guestBasketService.removeProduct(id);
        resolve(true);
      }
    });
  }

  billInvoice(billId: number) {
    if (this.isLoggedIn$) {
      this._authenticatedBasketService
        .getBillInvoice(billId)
        .subscribe((result) => this.basketCheckout$.next(result));
    }
  }

  resetBasket() {
    this.basketItems$.next([]);
    this.cartCount$.next(0);
    this.basketCheckout$.next(new BasketCheckoutViewModel(0, 0, 0, 0));
    this.shippingCost$.next(new ShippingCostViewModel(0, 0));
  }

  private _showSuccessMessage() {
    this._snackBar.showSuccessSnackBar('محصول با موفقیت به سبد خرید افزوده شد');
  }
}
