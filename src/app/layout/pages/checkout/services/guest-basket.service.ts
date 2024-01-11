import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { GuestBasketViewModel } from '../data/models/guest-basket.view-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { BasketItemViewModel } from '../data/models/basket-item.view-model';
import { isPlatformBrowser } from '@angular/common';
import { UpdateBasketDto } from '../data/dto/update-basket.dto';
import { InBasketCountViewModel } from '../data/models/in-basket-count.view-model';

@Injectable({ providedIn: 'root' })
export class GuestBasketService {
  private readonly storageKey = 'GUEST_BASKET';
  private basketSubject: BehaviorSubject<GuestBasketViewModel>;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    const initialBasket = this.getBasketFromLocalStorage();
    this.basketSubject = new BehaviorSubject<GuestBasketViewModel>(
      initialBasket
    );
  }

  get basket$(): Observable<GuestBasketViewModel> {
    return this.basketSubject.asObservable();
  }

  private emitBasketUpdate(basketData: GuestBasketViewModel): void {
    this.basketSubject.next(basketData);
  }

  private updateBasketLocalStorage(basketData: GuestBasketViewModel): void {
    if (isPlatformBrowser(this.platformId))
      localStorage.setItem(this.storageKey, JSON.stringify(basketData));
  }

  private getBasketFromLocalStorage(): GuestBasketViewModel {
    let storedData!: string | null;
    if (isPlatformBrowser(this.platformId))
      storedData = localStorage.getItem(this.storageKey);

    return storedData ? JSON.parse(storedData) : new GuestBasketViewModel();
  }

  private updateBasketState(items: BasketItemViewModel[]): void {
    const updatedBasket = new GuestBasketViewModel(items);
    this.updateBasketLocalStorage(updatedBasket);
    this.emitBasketUpdate(updatedBasket);
  }

  addToBasket(product: BasketItemViewModel): void {
    const { items } = this.basketSubject.value;
    const existingProduct = items.find(
      (p) =>
        p.product.id === product.product.id &&
        p.product.seller.id === product.product.seller.id
    );
    existingProduct ? existingProduct.count++ : items.push(product);
    this.updateBasketState(items);
  }

  updateBasket(dto: UpdateBasketDto) {
    let { items } = this.basketSubject.value;
    const existingProduct = items.find(
      (p) =>
        p.product.id === dto.productId && p.product.seller.id === dto.storeId
    );
    if (existingProduct) {
      if (dto.count === 0)
        items = this.removeProduct(existingProduct.product.id, dto.storeId!);
      else {
        existingProduct.count = dto.count;
      }
      this.updateBasketState(items);
    }
  }

  removeProduct(id: number, sellerId: number): BasketItemViewModel[] {
    const { items } = this.basketSubject.value;
    const index = items.findIndex(
      (x) => x.product.id === id && x.product.seller.id === sellerId
    );
    if (index != -1) {
      items.splice(index, 1);
    }

    this.updateBasketState(items);
    if (items.length === 0) this.clearBasket();
    return items;
  }

  isProductInBasket(productId: number): boolean {
    return this.basketSubject.value.items.some(
      (p) => p.product.id === productId
    );
  }

  calculateCheckout() {
    const totalPrice = this.basketSubject.value.items.reduce(
      (sum: number, current: BasketItemViewModel) =>
        sum + current.product.price * current.count,
      0
    );
    const payablePrice = this.basketSubject.value.items.reduce(
      (sum: number, current: BasketItemViewModel) =>
        sum + current.product.priceAfterDiscount * current.count,
      0
    );
    const profit = totalPrice - payablePrice;
    return { payablePrice, totalPrice, profit, totalDiscount: 0 };
  }

  getProductCountInBasket(productId: number): InBasketCountViewModel[] {
    debugger;
    const products = this.basketSubject.value.items.filter(
      (p) => p.product.id === productId
    ) as BasketItemViewModel[];

    return products.map((x) => {
      return {
        storeId: x.product.seller.id,
        count: x.count,
      } as InBasketCountViewModel;
    });
  }

  get cartBalance() {
    return this.basketSubject.value.items.reduce((sum, currentItem) => {
      return sum + currentItem.count;
    }, 0);
  }

  clearBasket(): void {
    if (isPlatformBrowser(this.platformId))
      localStorage.removeItem(this.storageKey);
    this.emitBasketUpdate(new GuestBasketViewModel());
  }
}
