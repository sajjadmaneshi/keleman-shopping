import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductCategoryViewModel } from '../data/models/view-models/product-category.view-model';

import { AuthService } from './auth/auth.service';

import { ArticleRepository } from 'src/app/layout/pages/magazine/data/repositories/article.repository';
import { ArticleCategoryViewModel } from '../../layout/pages/magazine/data/view-models/article-category.view-model';
import { ProfileService } from '../../layout/pages/profile/shared/profile.service';
import { ProfileViewModel } from '../../layout/pages/profile/data/view-models/profile.view-model';
import { BasketService } from '../../layout/pages/checkout/services/basket.service';
import { MegaMenuViewModel } from '../data/models/view-models/mega-menu.view-model';
import { MegaMenuRepository } from '../data/repositories/mega-menu.repository';
import { ProductCategoryService } from '../components/product-category/product-category.service';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class InitialAppService {
  isLoading = false;
  userSimpleInfo = new BehaviorSubject<ProfileViewModel>({
    firstName: '',
    lastName: '',
  });
  userCredit = new BehaviorSubject({ walletValue: 0, creditValue: 0 });

  productCategories = new BehaviorSubject<ProductCategoryViewModel[]>([]);
  articleCategories = new BehaviorSubject<ArticleCategoryViewModel[]>([]);
  megaMenu = new BehaviorSubject<MegaMenuViewModel[]>([]);
  constructor(
    private _productCategoryService: ProductCategoryService,
    private _articleRepository: ArticleRepository,
    private _megaMenuRepository: MegaMenuRepository,
    private _profileService: ProfileService,
    private _basketService: BasketService,
    private _authService: AuthService
  ) {}

  init() {
    this.isLoading = true;
    combineLatest([
      this._authService.isAuthenticated,
      this._productCategoryService.getCategories(),
      this._articleRepository
        .getArticleCategories()
        .pipe(map((x) => x.result!)),
    ])
      .pipe(take(1))
      .subscribe(([isAuthenticated, productcategories, articleCategories]) => {
        this.handleMegaMenu();
        if (isAuthenticated) this.handleAuthenticatedUserActions();
        this._basketService.cartBalance();
        if (productcategories) this.productCategories.next(productcategories);
        if (articleCategories) this.articleCategories.next(articleCategories);
        this.isLoading = false;
      });
  }

  private handleMegaMenu(): void {
    this._megaMenuRepository
      .getAll(null)
      .pipe(take(1))
      .subscribe({
        next: (result) => {
          this.megaMenu.next(result.result!);
        },
        error: () => (this.isLoading = false),
      });
  }

  private async handleAuthenticatedUserActions() {
    const result = await this._profileService.getPersonalInfo();
    this.userSimpleInfo.next(result!);
    this.getUserCredit();
  }

  public async getUserCredit() {
    const result = await this._profileService.getUserAccount();
    this.userCredit.next(result!);
  }
}
