import { Component, EventEmitter, Output } from '@angular/core';
import { InitialAppService } from '../../../../../../shared/services/initial-app.service';
import { ProductCategoryViewModel } from '../../../../../../shared/data/models/view-models/product-category.view-model';
import { ProductCategoryService } from '../../../../../../home/components/product-category/product-category.service';
import { AuthService } from '../../../../../../shared/services/auth/auth.service';
import { combineLatest, Subscription } from 'rxjs';
import { ArticleCategoryViewModel } from '../../../../../pages/magazine/data/view-models/article-category.view-model';

@Component({
  selector: 'keleman-off-canvas-menu',
  templateUrl: './off-canvas-menu.component.html',
})
export class OffCanvasMenuComponent {
  @Output() close = new EventEmitter();
  productCategories!: ProductCategoryViewModel[];
  articleCategories!: ArticleCategoryViewModel[];

  isLoggedIn = false;
  subscription!: Subscription;

  constructor(
    public initialAppService: InitialAppService,
    private _categoryService: ProductCategoryService,
    private _authService: AuthService
  ) {
    combineLatest(
      this.initialAppService.productCategories,
      this.initialAppService.articleCategories
    ).subscribe(([productCategories, articleCategories]) => {
      this.productCategories = productCategories!;
      this.articleCategories = articleCategories!;
    });
  }

  onClose() {
    this.close.emit();
  }

  ngOnInit(): void {
    this.subscription = this._authService.isAuthenticated.subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNavigate($event: { c1?: string; c2?: string; c3?: string }) {
    this._categoryService.onNavigate($event);
    this.onClose();
  }
}
