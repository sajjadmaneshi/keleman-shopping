import { Injectable } from '@angular/core';
import { GuestBasketViewModel } from './data/models/guest-basket.view-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductDetailViewModel } from '../products/data/models/view-models/product-detail.view-model';
import { BasketItemViewModel } from './data/models/basket-item.view-model';

@Injectable({ providedIn: 'root' })
export class GuestBasketService {
  private readonly storageKey = 'GUEST_BASKET';
  private basketSubject: BehaviorSubject<GuestBasketViewModel>;
  private totalPriceSubject: BehaviorSubject<number>;
  constructor() {
    const initialBasket = this.getBasketFromLocalStorage();
    this.basketSubject = new BehaviorSubject<GuestBasketViewModel>(
      initialBasket
    );
    this.totalPriceSubject = new BehaviorSubject<number>(
      initialBasket.totalPrice
    );
  }

  get basket$(): Observable<GuestBasketViewModel> {
    return this.basketSubject.asObservable();
  }

  private emitBasketUpdate(basketData: GuestBasketViewModel): void {
    this.basketSubject.next(basketData);
    this.totalPriceSubject.next(basketData.totalPrice);
  }

  private updateBasketLocalStorage(basketData: GuestBasketViewModel): void {
    localStorage.setItem(this.storageKey, JSON.stringify(basketData));
  }

  private getBasketFromLocalStorage(): GuestBasketViewModel {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : new GuestBasketViewModel();
  }

  private updateBasketState(
    items: BasketItemViewModel[],
    totalCount: number,
    totalPrice: number
  ): void {
    const updatedBasket = new GuestBasketViewModel(
      items,
      totalCount,
      totalPrice
    );
    this.updateBasketLocalStorage(updatedBasket);
    this.emitBasketUpdate(updatedBasket);
  }

  addToBasket(product: BasketItemViewModel): void {
    const { items, totalCount, totalPrice } = this.basketSubject.value;
    const existingProduct = items.find(
      (p) => p.product.id === product.product.id
    );
    if (existingProduct) {
      existingProduct.count++;
    } else {
      items.push(product);
    }

    this.updateBasketState(
      items,
      totalCount + 1,
      totalPrice + product.product.priceAfterDiscount
    );
  }

  removeFromBasket(productId: number): void {
    let { items, totalCount, totalPrice } = this.basketSubject.value;
    const existingProduct = items.find((p) => p.product.id === productId);
    if (existingProduct) {
      existingProduct.count > 1
        ? existingProduct.count--
        : (items = items.filter((p) => p.product.id !== productId));
      this.updateBasketState(
        items,
        totalCount - 1,
        totalPrice - existingProduct.product.priceAfterDiscount
      );
    }
  }

  removeProduct(basketItem: BasketItemViewModel): void {
    const { items, totalCount, totalPrice } = this.basketSubject.value;
    const updatedProducts = items.filter((p) => p.id !== basketItem.id);

    this.updateBasketState(
      updatedProducts,
      totalCount - basketItem.count,
      totalPrice - basketItem.product.priceAfterDiscount
    );
  }

  updateQuantity(productId: number, newQuantity: number): void {
    const { items, totalCount, totalPrice } = this.basketSubject.value;

    const updatedProducts = items.map((p) =>
      p.product.id === productId ? { ...p, count: newQuantity } : p
    );
    this.updateBasketState(updatedProducts, totalCount, totalPrice);
  }

  isProductInBasket(productId: number): boolean {
    return this.basketSubject.value.items.some(
      (p) => p.product.id === productId
    );
  }

  getProductCountInBasket(productId: number): number {
    const product = this.basketSubject.value.items.find(
      (p) => p.product.id === productId
    );
    return product ? product.count : 0;
  }

  get totalCount(): number {
    return this.basketSubject.value.totalCount;
  }
  get totalPrice$(): Observable<number> {
    return this.totalPriceSubject.asObservable();
  }

  clearBasket(): void {
    localStorage.removeItem(this.storageKey);
    this.emitBasketUpdate(new GuestBasketViewModel());
  }
}
