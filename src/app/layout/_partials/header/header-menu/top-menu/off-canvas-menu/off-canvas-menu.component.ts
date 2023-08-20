import { Component, EventEmitter, Output } from '@angular/core';
import { InitialAppService } from '../../../../../../shared/services/initial-app.service';
import { ProductCategoryViewModel } from '../../../../../../shared/data/models/view-models/product-category.view-model';
import { ProductCategoryService } from '../../../../../pages/main/components/product-category/product-category.service';
import { AuthService } from '../../../../../../shared/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'keleman-off-canvas-menu',
  templateUrl: './off-canvas-menu.component.html',
})
export class OffCanvasMenuComponent {
  @Output() close = new EventEmitter();
  productCategories!: ProductCategoryViewModel[];

  isLoggedIn = false;
  subscription!: Subscription;

  constructor(
    public initialAppService: InitialAppService,
    private _categoryService: ProductCategoryService,
    private _authService: AuthService
  ) {
    this.initialAppService.productCategories.subscribe((result) => {
      this.productCategories = result;
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
