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
import { combineLatest, Subject, takeUntil, tap } from 'rxjs';
import { ProductCategoryViewModel } from '../../../../shared/data/models/view-models/product-category.view-model';
import { ProfileViewModel } from '../../../pages/profile/data/view-models/profile.view-model';
import { UserCreditViewModel } from '../../../pages/profile/data/view-models/user-credit.view-model';
import { LoadingService } from '../../../../../common/services/loading.service';
import { ProductCategoryService } from '../../../../shared/components/product-category/product-category.service';

@Component({
  selector: 'keleman-header-mobile',
  templateUrl: './header-mobile.component.html',
})
export class HeaderMobileComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  userProfileInfo!: ProfileViewModel;
  userCreditInfo!: UserCreditViewModel;
  destroy$ = new Subject<void>();

  @Input() basketCount = 0;
  constructor(
    private readonly _offcanvasService: NgbOffcanvas,
    private readonly _authService: AuthService,
    private readonly _categoryService: ProductCategoryService,
    public readonly userService: InitialAppService,
    public readonly loadingService: LoadingService
  ) {}
  openOffCanvas(content: TemplateRef<any>) {
    this._offcanvasService.open(content, { position: 'end' });
  }

  navigateToPage($event: ProductCategoryViewModel) {
    this._categoryService.onNavigate({ c1: $event.url });
  }

  ngOnInit(): void {
    this.loadingService.startLoading('read', 'init');
    combineLatest([
      this._authService.isAuthenticated,
      this.userService.userSimpleInfo,
      this.userService.userCredit,
    ])
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'init')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: ([isLoggedIn, userInfo, userCredit]) => {
          this.isLoggedIn = isLoggedIn;
          this.userProfileInfo = userInfo;
          this.userCreditInfo = userCredit;
        },
        error: () => this.loadingService.stopLoading('read', 'init'),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
