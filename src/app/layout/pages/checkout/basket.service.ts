import { Injectable } from '@angular/core';
import { GuestBasketModel } from './data/models/guest-basket.model';
import { AddToBasketDto } from './data/dto/add-to-basket.dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductViewModel } from '../products/data/models/view-models/product.view-model';
import { ProductDetailViewModel } from '../products/data/models/view-models/product-detail.view-model';

@Injectable({ providedIn: 'root' })
export class BasketService {
  private readonly storageKey = 'GUEST_BASKET';
  private basketSubject: BehaviorSubject<GuestBasketModel>;
  private totalPriceSubject: BehaviorSubject<number>;
  constructor() {
    const initialBasket = this.getBasketFromLocalStorage();
    this.basketSubject = new BehaviorSubject<GuestBasketModel>(initialBasket);
    this.totalPriceSubject = new BehaviorSubject<number>(
      initialBasket.totalPrice
    );
  }

  get basket$(): Observable<GuestBasketModel> {
    return this.basketSubject.asObservable();
  }

  private emitBasketUpdate(basketData: GuestBasketModel): void {
    this.basketSubject.next(basketData);
    this.totalPriceSubject.next(basketData.totalPrice);
  }

  private updateBasketLocalStorage(basketData: GuestBasketModel): void {
    localStorage.setItem(this.storageKey, JSON.stringify(basketData));
  }

  private getBasketFromLocalStorage(): GuestBasketModel {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : new GuestBasketModel();
  }

  private updateBasketState(
    products: { product: ProductDetailViewModel; count: number }[],
    totalCount: number,
    totalPrice: number
  ): void {
    const updatedBasket = new GuestBasketModel(
      products,
      totalCount,
      totalPrice
    );
    this.updateBasketLocalStorage(updatedBasket);
    this.emitBasketUpdate(updatedBasket);
  }

  addToBasket(product: {
    product: ProductDetailViewModel;
    count: number;
  }): void {
    const { products, totalCount, totalPrice } = this.basketSubject.value;
    const existingProduct = products.find(
      (p) => p.product.id === product.product.id
    );
    if (existingProduct) {
      existingProduct.count++;
    } else {
      products.push(product);
    }

    this.updateBasketState(
      products,
      totalCount + 1,
      totalPrice + product.product.currentPrice
    );
  }

  removeFromBasket(productId: number): void {
    let { products, totalCount, totalPrice } = this.basketSubject.value;
    const existingProduct = products.find((p) => p.product.id === productId);
    if (existingProduct) {
      existingProduct.count > 1
        ? existingProduct.count--
        : (products = products.filter((p) => p.product.id !== productId));
      this.updateBasketState(
        products,
        totalCount - 1,
        totalPrice - existingProduct.product.currentPrice
      );
    }
  }

  removeProduct(removeData: {
    product: ProductDetailViewModel;
    count: number;
  }): void {
    const { products, totalCount, totalPrice } = this.basketSubject.value;
    const updatedProducts = products.filter(
      (p) => p.product.id !== removeData.product.id
    );

    this.updateBasketState(
      updatedProducts,
      totalCount - removeData.count,
      totalPrice - removeData.product.currentPrice
    );
  }

  updateQuantity(productId: number, newQuantity: number): void {
    const { products, totalCount, totalPrice } = this.basketSubject.value;

    const updatedProducts = products.map((p) =>
      p.product.id === productId ? { ...p, count: newQuantity } : p
    );
    this.updateBasketState(products, totalCount, totalPrice);
  }

  isProductInBasket(productId: number): boolean {
    return this.basketSubject.value.products.some(
      (p) => p.product.id === productId
    );
  }

  getProductCountInBasket(productId: number): number {
    const product = this.basketSubject.value.products.find(
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
    this.emitBasketUpdate(new GuestBasketModel());
  }
}
