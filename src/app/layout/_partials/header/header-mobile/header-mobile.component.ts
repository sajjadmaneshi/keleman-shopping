import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { InitialAppService } from '../../../../shared/services/initial-app.service';
import { combineLatest, Subject, Subscription, takeUntil } from 'rxjs';
import { ProductCategoryService } from '../../../../home/components/product-category/product-category.service';
import { ProductCategoryViewModel } from '../../../../shared/data/models/view-models/product-category.view-model';
import { ProfileViewModel } from '../../../pages/profile/data/view-models/profile.view-model';
import { UserCreditViewModel } from '../../../pages/profile/data/view-models/user-credit.view-model';

@Component({
  selector: 'keleman-header-mobile',
  templateUrl: './header-mobile.component.html',
})
export class HeaderMobileComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  userProfileInfo!: ProfileViewModel;
  userCreditInfo!: UserCreditViewModel;
  isLoading = true;
  destroy$ = new Subject<void>();

  @Input() basketCount = 0;
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
    combineLatest(
      this._authService.isAuthenticated,
      this.userService.userSimpleInfo,
      this.userService.userCredit
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(([isLoggedIn, userInfo, userCredit]) => {
        this.isLoggedIn = isLoggedIn;
        this.userProfileInfo = userInfo;
        this.userCreditInfo = userCredit;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
