import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { DOCUMENT, isPlatformBrowser } from '@angular/common';

import { ProductCategoryService } from '../../../../home/components/product-category/product-category.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Routing } from '../../../../routing';
import { InitialAppService } from '../../../../shared/services/initial-app.service';
import { ProductCategoryViewModel } from '../../../../shared/data/models/view-models/product-category.view-model';
import { SsrService } from '../../../../shared/services/ssr/ssr.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'keleman-header-menu',
  templateUrl: './header-menu.component.html',
  providers: [SsrService],
})
export class HeaderMenuComponent implements OnInit, AfterViewInit {
  @ViewChild('dropDownMenu') dropDownMenu!: ElementRef;
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  destroy$ = new Subject<void>();
  screenWidth!: number;
  currentRoute = '/';

  productCategories!: ProductCategoryViewModel[];

  page = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private _platformId: any,
    private _renderer2: Renderer2,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _initialAppService: InitialAppService,
    private _ssrService: SsrService,
    public categoryService: ProductCategoryService
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
    if (isPlatformBrowser(this._platformId)) this._calculateMenuHeight();
    this._getQueryParamsFromUrl();
  }

  onHover($event: any) {
    $event.stopPropagation();

    const width = this.screenWidth - this.screenWidth * 0.15;

    this.document.documentElement.style.setProperty(
      '--mega-menu-width',
      `${width}px`
    );
    this.menuTrigger.openMenu();
  }

  private _getQueryParamsFromUrl() {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkResetPage(event.url);
      }
    });
    this._activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((queryParams) => {
        const page = Number(queryParams['p']);
        if (!isNaN(page)) this.page = page;
      });
  }

  onNavigate($event: { c1?: string; c2?: string; c3?: string }) {
    this.categoryService.onNavigate($event);
    this.menuTrigger.closeMenu();
  }

  checkResetPage(route: string) {
    const routeSplit = route.split('?')[0];
    if (this.currentRoute === `/${Routing.magazine}`) {
      if (this.currentRoute !== routeSplit) this.page = 0;
    }
    this.currentRoute = routeSplit;
  }

  ngOnInit(): void {
    this._initialAppService.productCategories.subscribe((data) => {
      this.productCategories = data!;
    });
  }
}
