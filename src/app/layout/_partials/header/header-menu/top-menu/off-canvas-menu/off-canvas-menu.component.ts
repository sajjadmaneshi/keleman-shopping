import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { InitialAppService } from '../../../../../../shared/services/initial-app.service';

import { AuthService } from '../../../../../../shared/services/auth/auth.service';
import { combineLatest, Subject, Subscription, takeUntil } from 'rxjs';
import { ArticleCategoryViewModel } from '../../../../../pages/magazine/data/view-models/article-category.view-model';
import { ProfileViewModel } from '../../../../../pages/profile/data/view-models/profile.view-model';
import { Routing } from '../../../../../../routing';
import { MegaMenuViewModel } from '../../../../../../shared/data/models/view-models/mega-menu.view-model';
import { ProductCategoryService } from 'src/app/shared/components/product-category/product-category.service';

@Component({
  selector: 'keleman-off-canvas-menu',
  templateUrl: './off-canvas-menu.component.html',
})
export class OffCanvasMenuComponent implements OnDestroy {
  @Output() close = new EventEmitter();
  productCategories!: MegaMenuViewModel[];
  articleCategories!: ArticleCategoryViewModel[];
  routing = Routing;
  isLoggedIn = false;
  subscription!: Subscription;

  userProfileInfo!: ProfileViewModel;

  destroy$ = new Subject<void>();

  constructor(
    public readonly initialAppService: InitialAppService,
    private readonly _categoryService: ProductCategoryService,
    private readonly _authService: AuthService
  ) {
    combineLatest([
      _authService.isAuthenticated,
      initialAppService.megaMenu,
      initialAppService.articleCategories,
      initialAppService.userSimpleInfo,
    ])
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

  onNavigate($event: string) {
    this._categoryService.onNavigate($event);
    this.onClose();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
