import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { GuestBasketViewModel } from './data/models/guest-basket.view-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { BasketItemViewModel } from './data/models/basket-item.view-model';
import { isPlatformBrowser } from '@angular/common';
import { UpdateBasketDto } from './data/dto/update-basket.dto';

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
      (p) => p.product.id === product.product.id
    );
    existingProduct ? existingProduct.count++ : items.push(product);
    this.updateBasketState(items);
  }

  updateBasket(dto: UpdateBasketDto) {
    let { items } = this.basketSubject.value;
    const existingProduct = items.find((p) => p.product.id === dto.productId);
    if (existingProduct) {
      if (dto.count === 0)
        items = this.removeProduct(existingProduct.product.id);
      else {
        existingProduct.count = dto.count;
      }
      this.updateBasketState(items);
    }
  }

  removeProduct(id: number): BasketItemViewModel[] {
    const { items } = this.basketSubject.value;
    const updatedProducts = items.filter((p) => p.product.id != id);
    this.updateBasketState(updatedProducts);
    if (updatedProducts.length === 0) this.clearBasket();
    return updatedProducts;
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

  getProductCountInBasket(productId: number): number {
    const product = this.basketSubject.value.items.find(
      (p) => p.product.id === productId
    );
    return product ? product.count : 0;
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
