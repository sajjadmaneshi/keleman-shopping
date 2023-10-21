import { UserSimpleInfoViewModel } from '../data/models/view-models/user-simple-info.view-model';
import { UserRepository } from '../data/repositories/user/user.repository';

import { BehaviorSubject, combineLatest, Subject, takeUntil, tap } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { ProductCategoryViewModel } from '../data/models/view-models/product-category.view-model';
import { ProductRepository } from '../../layout/pages/products/data/repositories/product.repository';
import { AuthService } from './auth/auth.service';
import { ProductCategoryService } from '../../home/components/product-category/product-category.service';
import { ProductCategoryRepository } from '../../layout/pages/products/data/repositories/product-category.repository';

@Injectable({ providedIn: 'root' })
export class InitialAppService implements OnDestroy {
  isLoading = false;
  userSimpleInfo!: UserSimpleInfoViewModel;
  productCategories = new BehaviorSubject<ProductCategoryViewModel[]>([]);

  destroy$ = new Subject<void>();
  constructor(
    private _userRepository: UserRepository,
    private _productCategoryService: ProductCategoryService,
    private _authService: AuthService
  ) {}

  init() {
    this.isLoading = true;
    combineLatest(
      this._authService.isAuthenticated,
      this._productCategoryService.getCategories()
    )
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe(([isAuthenticated, productcategory]) => {
        if (isAuthenticated) {
          this._authService.getUserSimpleInfo().then((res) => {
            this.userSimpleInfo = res!;
          });
        }

        if (productcategory) this.productCategories.next(productcategory);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
