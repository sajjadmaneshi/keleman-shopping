import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductRepository } from '../../../data/repositories/product.repository';
import { Subscription, tap } from 'rxjs';
import { ProductSpecificViewModel } from '../../../data/models/view-models/product-specific.view-model';
import { SharedVariablesService } from '../../../../../../shared/services/shared-variables.service';
import { AddToBasketDto } from '../../../../checkout/data/dto/add-to-basket.dto';
import { GuestBasketModel } from '../../../../checkout/data/models/guest-basket.model';
import { ProductDetailViewModel } from '../../../data/models/view-models/product-detail.view-model';
import { BasketService } from '../../../../checkout/basket.service';

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
    private _basketService: BasketService
  ) {
    this._getProductSpecification();
  }

  private _getProductSpecification() {
    this.subscription = this._productRepository
      .getProductSpecifics(this._productService.productUrl)
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe((result) => {
        this.specifications = [...result.result!];
      });
  }

  addToBasket() {
    const productItem = {
      product: this.productDetail,
      count: 1,
    };

    if (!this.isLoggedIn) {
      this._basketService.addToBasket(productItem);
      this.productCountInBasket++;
    }
  }

  removeFromBasket() {
    if (!this.isLoggedIn) {
      this._basketService.removeFromBasket(this.productDetail.id);
      this.productCountInBasket--;
    }
  }

  ngOnInit(): void {
    if (this.productDetail) {
      this.isInBasket = this._basketService.isProductInBasket(
        this.productDetail.id
      );
      if (this.isInBasket)
        this.productCountInBasket = this._basketService.getProductCountInBasket(
          this.productDetail.id
        );
    }
  }
}
