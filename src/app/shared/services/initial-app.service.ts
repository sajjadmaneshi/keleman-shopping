import {
  BehaviorSubject,
  combineLatest,
  map,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { ProductCategoryViewModel } from '../data/models/view-models/product-category.view-model';

import { AuthService } from './auth/auth.service';
import { ProductCategoryService } from '../../home/components/product-category/product-category.service';
import { ArticleRepository } from 'src/app/layout/pages/magazine/data/repositories/article.repository';
import { ArticleCategoryViewModel } from '../../layout/pages/magazine/data/view-models/article-category.view-model';
import { ProfileService } from '../../layout/pages/profile/shared/profile.service';
import { ProfileViewModel } from '../../layout/pages/profile/data/view-models/profile.view-model';
import { BasketService } from '../../layout/pages/checkout/purchase/basket.service';

@Injectable({ providedIn: 'root' })
export class InitialAppService implements OnDestroy {
  isLoading = false;
  userSimpleInfo = new BehaviorSubject<ProfileViewModel>({
    firstName: '',
    lastName: '',
  });
  userCredit = new BehaviorSubject({ walletValue: 0, creditValue: 0 });

  productCategories = new BehaviorSubject<ProductCategoryViewModel[]>([]);
  articleCategories = new BehaviorSubject<ArticleCategoryViewModel[]>([]);

  destroy$ = new Subject<void>();
  constructor(
    private _productCategoryService: ProductCategoryService,
    private _articleRepository: ArticleRepository,
    private _profileService: ProfileService,
    private _basketService: BasketService,
    private _authService: AuthService
  ) {}

  init() {
    this.isLoading = true;

    combineLatest(
      this._authService.isAuthenticated,
      this._productCategoryService.getCategories(),
      this._articleRepository.getArticleCategories().pipe(map((x) => x.result!))
    )
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe(([isAuthenticated, productcategories, articleCategories]) => {
        if (isAuthenticated) {
          this._profileService.getPersonalInfo().then((result) => {
            this.userSimpleInfo.next(result!);
          });
          this.getUserCredit();
          this._basketService.getCartCount();
        }

        if (productcategories) this.productCategories.next(productcategories);
        if (articleCategories) this.articleCategories.next(articleCategories);
      });
  }

  public getUserCredit() {
    this._profileService.getUserAccount().then((result) => {
      this.userCredit.next(result!);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
