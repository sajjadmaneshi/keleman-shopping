import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductRepository } from '../../../data/repositories/product.repository';
import { Subscription, tap } from 'rxjs';
import { ProductSpecificViewModel } from '../../../data/models/view-models/product-specific.view-model';
import { SharedVariablesService } from '../../../../../../shared/services/shared-variables.service';
import { GuestBasketModel } from '../../../../checkout/data/models/guest-basket.model';
import { ProductDetailViewModel } from '../../../data/models/view-models/product-detail.view-model';
import { GuestBasketService } from '../../../../checkout/guest-basket.service';
import { BasketService } from '../../../../checkout/purchase/basket.service';
import { AddToCartDto } from '../../../../checkout/data/dto/add-to-cart.dto';
import { UpdateBasketDto } from '../../../../checkout/data/dto/update-basket.dto';
import { LoadingService } from '../../../../../../../common/services/loading.service';

@Component({
  selector: 'keleman-product-meta',
  templateUrl: './product-meta.component.html',
  styleUrls: ['./product-meta.component.scss'],
})
export class ProductMetaComponent implements OnInit {
  isLoading = true;
  specifications!: ProductSpecificViewModel[];
  subscription!: Subscription;

  isInBasket = false;
  productCountInBasket = 0;
  @Input() isLoggedIn = false;
  @Input() productDetail!: ProductDetailViewModel;
  @Input() details!: { price: number; currentStock: number };
  constructor(
    private _productService: ProductService,
    private _productRepository: ProductRepository,
    public sharedVariableService: SharedVariablesService,
    private _guestBasketService: GuestBasketService,
    private _basketServie: BasketService,
    public readonly loadingService: LoadingService
  ) {
    this._getProductSpecification();
    this._basketServie.productCountInBasket.subscribe((res) => {
      this.productCountInBasket = res;
    });
  }

  private _getProductSpecification() {
    this.subscription = this._productRepository
      .getProductSpecifics(this._productService.productUrl)
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe((result) => {
        this.specifications = [...result.result!];
      });
  }

  addToBasketGuest() {
    const productItem = {
      product: this.productDetail,
      count: 1,
    };

    if (!this.isLoggedIn) {
      this._guestBasketService.addToBasket(productItem);
      this.productCountInBasket++;
    }
  }

  addToBasketAuthorized() {
    const dto = {
      productId: this.productDetail.id,
      // storeId: this.productDetail.stores[0].id,
    } as AddToCartDto;
    this._basketServie.addToBasket(dto);
  }

  updateBasketAuthorized(count: number) {
    const dto = {
      productId: this.productDetail.id,
      // storeId: this.productDetail.stores[0].id,
      count,
    } as UpdateBasketDto;
    this._basketServie.updateBasket(dto);
  }

  removeFromBasket() {
    if (!this.isLoggedIn) {
      this._guestBasketService.removeFromBasket(this.productDetail.id);
      this.productCountInBasket--;
    }
  }

  ngOnInit(): void {
    if (this.productDetail) {
      this.isInBasket = this._guestBasketService.isProductInBasket(
        this.productDetail.id
      );
      if (this.isInBasket)
        this.productCountInBasket =
          this._guestBasketService.getProductCountInBasket(
            this.productDetail.id
          );
    }
  }
}
