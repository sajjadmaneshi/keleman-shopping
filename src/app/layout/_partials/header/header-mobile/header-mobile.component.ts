import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { InitialAppService } from '../../../../shared/services/initial-app.service';
import { Subscription } from 'rxjs';
import { ProductCategoryService } from '../../../pages/main/components/product-category/product-category.service';
import { ProductCategoryViewModel } from '../../../../shared/data/models/view-models/product-category.view-model';

@Component({
  selector: 'keleman-header-mobile',
  templateUrl: './header-mobile.component.html',
})
export class HeaderMobileComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  subscription!: Subscription;
  constructor(
    private offcanvasService: NgbOffcanvas,
    private _authService: AuthService,
    public userService: InitialAppService,
    private _categoryService: ProductCategoryService
  ) {}
  openOffCanvas(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }

  navigateToPage($event: ProductCategoryViewModel) {
    this._categoryService.onNavigate({ c1: $event.url });
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
}
