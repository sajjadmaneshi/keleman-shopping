import { UserSimpleInfoViewModel } from '../data/models/view-models/user-simple-info.view-model';
import { UserRepository } from '../data/repositories/user/user.repository';
import { HttpClientResult } from '../data/models/http/http-client.result';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductCategoryViewModel } from '../data/models/view-models/product-category.view-model';
import { ProductRepository } from '../../layout/pages/products/data/repositories/product.repository';
import { AuthService } from './auth/auth.service';

@Injectable()
export class InitialAppService {
  isLoading = false;
  userSimpleInfo!: UserSimpleInfoViewModel;
  productCategories!: ProductCategoryViewModel[];

  constructor(
    private _userRepository: UserRepository,
    private _productRepsository: ProductRepository,
    private _authService: AuthService
  ) {}

  init() {
    this._authService.isAuthenticated.subscribe((result) => {
      if (result) {
        this._authService.getUserSimpleInfo().then((res) => {
          this.userSimpleInfo = res!;
        });
      }
    });
    this._getProductCategories();
  }

  private _getProductCategories(): void {
    this.isLoading = true;
    this._productRepsository
      .getAllProductCategoriesWithChildrens()
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe((response: HttpClientResult<ProductCategoryViewModel[]>) => {
        this.productCategories = response.result!;
      });
  }
}
