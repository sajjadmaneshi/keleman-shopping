import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductViewModel } from '../products/data/models/view-models/product.view-model';
import { ProductSortTypeEnum } from '../products/data/enums/product-sort-type .enum';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { RouteHandlerService } from '../../../shared/services/route-handler/route-handler.service';
import { ModifyMetaDataService } from '../../../../common/services/modify-meta-data.service';
import { ProductFilterService } from '../products/services/product-filter.service';
import { QueryParamGeneratorService } from '../../../shared/services/query-params-generator.service';
import {
  BaseDataFetcherService,
  REPOSITORY_TOKEN,
} from '../../../shared/services/base-data-fetcher.service';
import { ProductSearchResult } from '../../../shared/services/search.service';
import { SharedVariablesService } from '../../../shared/services/shared-variables.service';
import { ApplicationStateService } from '../../../shared/services/application-state.service';
import { Params } from '@angular/router';

import { take } from 'rxjs/operators';

import { SelectedFilterModel } from './components/product-filters/data/selected-filter.model';
import { ProductRepository } from '../products/data/repositories/product.repository';
import { ProductCategoryService } from '../../../shared/components/product-category/product-category.service';

@Component({
  selector: 'keleman-product-category',
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.scss',
  providers: [
    {
      provide: REPOSITORY_TOKEN,
      useClass: ProductRepository,
    },
    ProductFilterService,
    BaseDataFetcherService,
    RouteHandlerService,
    ModifyMetaDataService,
  ],
})
export class ProductCategoryComponent implements OnInit, OnDestroy {
  page = 1;
  limit = 12;
  categoryUrl!: string;
  searchText = '';
  maxPrice!: number;
  totalElements = 0;
  categoryId!: number;
  products: ProductViewModel[] = [];
  sortBy: ProductSortTypeEnum = 0;
  private destroy$ = new Subject<void>();
  constructor(
    private _routeHandlerService: RouteHandlerService,
    private _metDataService: ModifyMetaDataService,
    private _productFilterService: ProductFilterService,
    private _queryParamService: QueryParamGeneratorService,
    private _categoryService: ProductCategoryService,
    public fetchDataService: BaseDataFetcherService<ProductSearchResult>,
    public sharedVaribaleService: SharedVariablesService,
    public applicationStateService: ApplicationStateService
  ) {}

  ngOnInit(): void {
    this._queryParamService.fixQueryParamsOrderInUrl();
    this._getParamsFromUrl();
  }

  private _getParamsFromUrl() {
    combineLatest([
      this._routeHandlerService.getRouteParams(),
      this._routeHandlerService.getQueryParams(),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([params, queryParams]) => {
        this.products = [];
        this._extractCategoryUrlFromParams(params);
        this._extractPageAndSearchTextFromQueryParams(queryParams);
      });
  }

  private _extractCategoryUrlFromParams(params: Params) {
    const keys = Object.keys(params);
    this.categoryUrl =
      keys.length > 0 ? params[keys[keys.length - 1]].toString() : '';
  }

  private _parseQueryParams(urlQueryParams: Params) {
    if (urlQueryParams['p']) this.page = Number(urlQueryParams['p']) + 1;
    const { p, ...restUrlQueryParams } = urlQueryParams;
    this.searchText = urlQueryParams['q'];
    this.sortBy = urlQueryParams['sortBy'] ?? 0;
    return restUrlQueryParams;
  }

  private _extractPageAndSearchTextFromQueryParams(urlQueryParams: Params) {
    const queryParams = {
      catUrl: this.categoryUrl,
      offset: this.page - 1,
      limit: this.limit,
      ...this._parseQueryParams(urlQueryParams),
    };
    this._getAllProducts(queryParams);
  }

  pageChange($event: number) {
    this.page = $event;
    this._productFilterService.addToFilterList(
      new SelectedFilterModel('p', '', (this.page - 1).toString())
    );
    this._productFilterService.navigateWithNewParams();
  }

  onSelectSort($event: ProductSortTypeEnum) {
    this._productFilterService.navigateWithNewParams({
      sortBy: $event == 0 ? undefined : $event,
    });
  }

  private _getAllProducts(params: { [key: string]: any }) {
    this.fetchDataService
      .fetchData(params)
      .pipe(take(1))
      .subscribe((result: ProductSearchResult | undefined) => {
        const { products, totalElements, maxPrice, category } = result!;
        this.products = [...products];
        this.totalElements = totalElements;
        this.maxPrice = maxPrice;
        this.categoryId = category?.id;

        this._metDataService.setMetaData(
          category ? category.seoTitle : 'همه محصولات',
          category ? category.seoDescription : 'همه محصولات'
        );
      });
  }

  onNavigate($event: string) {
    this._categoryService.onNavigate($event);
  }

  private buildNewCategoryUrlSegment(): string {
    const currentParams = this._routeHandlerService.getRouteParamsSnapShot();
    const catUrl1 = currentParams['catUrl1'] || '';
    const catUrl2 = currentParams['catUrl2'] || '';
    const newCategoryUrlSegment =
      `${catUrl1}/${catUrl2}/${this.categoryUrl}`.replace(/\/{2,}/g, '/');

    return newCategoryUrlSegment;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
