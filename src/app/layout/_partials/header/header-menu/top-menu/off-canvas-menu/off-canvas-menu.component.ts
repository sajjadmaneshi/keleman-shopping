import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { InitialAppService } from '../../../../../../shared/services/initial-app.service';
import { ProductCategoryViewModel } from '../../../../../../shared/data/models/view-models/product-category.view-model';
import { ProductCategoryService } from '../../../../../../home/components/product-category/product-category.service';
import { AuthService } from '../../../../../../shared/services/auth/auth.service';
import { combineLatest, Subject, Subscription, takeUntil } from 'rxjs';
import { ArticleCategoryViewModel } from '../../../../../pages/magazine/data/view-models/article-category.view-model';
import { ProfileViewModel } from '../../../../../pages/profile/data/view-models/profile.view-model';

@Component({
  selector: 'keleman-off-canvas-menu',
  templateUrl: './off-canvas-menu.component.html',
})
export class OffCanvasMenuComponent implements OnDestroy {
  @Output() close = new EventEmitter();
  productCategories!: ProductCategoryViewModel[];
  articleCategories!: ArticleCategoryViewModel[];

  isLoggedIn = false;
  subscription!: Subscription;

  userProfileInfo!: ProfileViewModel;

  destroy$ = new Subject<void>();

  constructor(
    public readonly initialAppService: InitialAppService,
    private readonly _categoryService: ProductCategoryService,
    private readonly _authService: AuthService
  ) {
    combineLatest(
      _authService.isAuthenticated,
      initialAppService.productCategories,
      initialAppService.articleCategories,
      initialAppService.userSimpleInfo
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ([
          isLoggedIn,
          productCategories,
          articleCategories,
          userSimpleInfo,
        ]) => {
          this.isLoggedIn = isLoggedIn;
          this.productCategories = productCategories!;
          this.articleCategories = articleCategories!;
          this.userProfileInfo = userSimpleInfo;
        }
      );
  }

  onClose() {
    this.close.emit();
  }

  onNavigate($event: { c1?: string; c2?: string; c3?: string }) {
    this._categoryService.onNavigate($event);
    this.onClose();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
