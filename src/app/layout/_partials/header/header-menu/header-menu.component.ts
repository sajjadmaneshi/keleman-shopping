import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

import { ProductCategoryService } from '../../../pages/main/components/product-category/product-category.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Routing } from '../../../../routing';
import { InitialAppService } from '../../../../shared/services/initial-app.service';
import { ProductCategoryViewModel } from '../../../../shared/data/models/view-models/product-category.view-model';

@Component({
  selector: 'keleman-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit, AfterViewInit {
  @ViewChild('dropDownMenu') dropDownMenu!: ElementRef;
  @ViewChild('myDrop') myDrop!: NgbDropdown;

  destroy$ = new Subject<void>();
  screenWidth!: number;
  currentRoute = '/';

  productCategories!: ProductCategoryViewModel[];

  page = 0;
  constructor(
    private _renderer2: Renderer2,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _initialAppService: InitialAppService,
    public categoryService: ProductCategoryService,
    @Inject(DOCUMENT) document: Document
  ) {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this._calculateMenuHeight();
  }

  private _calculateMenuHeight() {
    const clientHeight = document.documentElement.clientHeight;
    const headerHeight = document
      .getElementById('keleman-header')
      ?.getBoundingClientRect().height;

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
    this._calculateMenuHeight();
    this._getQueryParamsFromUrl();
  }

  onHover($event: any) {
    if (!this.categoryService.isLoading.value) {
      $event.stopPropagation();
      this.myDrop.open();
      const megaMenu = document.getElementById('mega-menu');
      const width = this.screenWidth - this.screenWidth * 0.1;
      this._renderer2.setStyle(megaMenu, 'width', `${width}px`);
    }
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
    this.myDrop.close();
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
