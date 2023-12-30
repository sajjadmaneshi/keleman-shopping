import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { DOCUMENT, isPlatformBrowser } from '@angular/common';

import { ProductCategoryService } from '../../../../home/components/product-category/product-category.service';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Routing } from '../../../../routing';
import { InitialAppService } from '../../../../shared/services/initial-app.service';
import { ProductCategoryViewModel } from '../../../../shared/data/models/view-models/product-category.view-model';
import { SsrService } from '../../../../shared/services/ssr/ssr.service';
import { ArticleCategoryViewModel } from '../../../pages/magazine/data/view-models/article-category.view-model';

@Component({
  selector: 'keleman-header-menu',
  templateUrl: './header-menu.component.html',
})
export class HeaderMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('productCategoryDropDownMenu') dropDownMenu!: ElementRef;

  destroy$ = new Subject<void>();
  screenWidth!: number;
  currentRoute = '/';
  productCategories!: ProductCategoryViewModel[];
  articleCategories!: ArticleCategoryViewModel[];
  page = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private _platformId: any,
    private readonly _renderer2: Renderer2,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _initialAppService: InitialAppService,
    private readonly _ssrService: SsrService,
    public readonly categoryService: ProductCategoryService
  ) {
    this.screenWidth = this._ssrService.getWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = this._ssrService.getWidth;
    if (isPlatformBrowser(this._platformId)) this._calculateMenuHeight();
  }

  private _calculateMenuHeight() {
    const clientHeight = this._ssrService.getClientHeight;
    const kelemanHeader = this.document.getElementById('keleman-header');
    let headerHeight = 0;
    if (kelemanHeader) {
      headerHeight = kelemanHeader.getBoundingClientRect().height;
    }

    const height = clientHeight - headerHeight!;
    this._renderer2.setStyle(
      this.dropDownMenu?.nativeElement,
      'max-height',
      `${height - 20}px`
    );
    this._renderer2.setStyle(
      this.dropDownMenu?.nativeElement,
      'overflow-y',
      'auto'
    );
  }

  ngAfterViewInit(): void {
    const width = this.screenWidth * 0.85;
    this.document.documentElement.style.setProperty(
      '--mega-menu-width',
      `${width}px`
    );
    if (isPlatformBrowser(this._platformId)) this._calculateMenuHeight();
    this._getQueryParamsFromUrl();
  }

  private _getQueryParamsFromUrl() {
    combineLatest([this._router.events, this._activatedRoute.queryParams])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([events, queryParams]) => {
        if (events instanceof NavigationEnd) {
          this.checkResetPage(events.url);
        }
        const page = Number(queryParams['p']);
        if (!isNaN(page)) this.page = page;
      });
  }

  onNavigate(
    target: HTMLDivElement,
    $event: { c1?: string; c2?: string; c3?: string }
  ) {
    this.categoryService.onNavigate($event);
    this.closeMenu(target);
  }

  checkResetPage(route: string) {
    const routeSplit = route.split('?')[0];
    if (this.currentRoute === `/${Routing.magazine}`) {
      if (this.currentRoute !== routeSplit) this.page = 0;
    }
    this.currentRoute = routeSplit;
  }

  ngOnInit(): void {
    combineLatest([
      this._initialAppService.productCategories,
      this._initialAppService.articleCategories,
    ]).subscribe(([productCategories, articleCategories]) => {
      this.productCategories = productCategories!;
      this.articleCategories = articleCategories!;
    });
  }

  closeMenu(target: HTMLDivElement) {
    target.style.display = 'none';
  }
  openMenu(target: HTMLDivElement) {
    target.style.display = 'block';
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
