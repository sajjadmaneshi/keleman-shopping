import { UserSimpleInfoViewModel } from '../data/models/view-models/user-simple-info.view-model';
import { UserRepository } from '../data/repositories/user/user.repository';

import { BehaviorSubject, combineLatest, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductCategoryViewModel } from '../data/models/view-models/product-category.view-model';
import { ProductRepository } from '../../layout/pages/products/data/repositories/product.repository';
import { AuthService } from './auth/auth.service';

@Injectable({ providedIn: 'root' })
export class InitialAppService {
  isLoading = false;
  userSimpleInfo!: UserSimpleInfoViewModel;
  productCategories = new BehaviorSubject<ProductCategoryViewModel[]>([]);

  constructor(
    private _userRepository: UserRepository,
    private _productRepsository: ProductRepository,
    private _authService: AuthService
  ) {}

  init() {
    this.isLoading = true;
    combineLatest(
      this._authService.isAuthenticated,
      this._productRepsository.getAllProductCategoriesWithChildrens()
    )
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe(([isAuthenticated, productcategory]) => {
        if (isAuthenticated) {
          this._authService.getUserSimpleInfo().then((res) => {
            this.userSimpleInfo = res!;
          });
        }

        if (productcategory)
          this.productCategories.next(productcategory.result!);
      });
  }
}
