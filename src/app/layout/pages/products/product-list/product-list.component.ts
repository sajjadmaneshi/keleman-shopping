import { Component, InjectionToken, OnDestroy, OnInit } from '@angular/core';
import { ProductViewModel } from '../data/models/view-models/product.view-model';
import { combineLatest, map, Subject, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductRepository } from '../data/repositories/product.repository';
import { HttpClientResult } from '../../../../shared/data/models/http/http-client.result';
import { SharedVariablesService } from '../../../../shared/services/shared-variables.service';
import { ProductCategoryViewModel } from 'src/app/shared/data/models/view-models/product-category.view-model';
import { Routing } from '../../../../routing';
import { CategorySimpleInfoViewModel } from '../data/models/view-models/category-simple-info.view-model';
import { QueryParamGeneratorService } from '../../../../shared/services/query-params-generator.service';
import {
  BaseDataFetcherService,
  REPOSITORY_TOKEN,
} from '../../../../shared/services/base-data-fetcher.service';
import {
  CategoryMinifyViewModel,
  ProductSearchResult,
} from '../../../../shared/services/search.service';
import { ProductSortTypeEnum } from '../data/enums/product-sort-type .enum';
import { RouteHandlerService } from '../../../../shared/services/route-handler/route-handler.service';
import { ProductFilterService } from '../services/product-filter.service';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';
import { SelectedFilterModel } from './components/product-filters/data/selected-filter.model';
import { Meta, Title } from '@angular/platform-browser';
import { ModifyMetaDataService } from '../../../../../common/services/modify-meta-data.service';

@Component({
  selector: 'keleman-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['product-list.component.scss'],
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
export class ProductListComponent implements OnInit, OnDestroy {
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
    private _router: Router,
    private _productFilterService: ProductFilterService,
    private _queryParamService: QueryParamGeneratorService,
    public fetchDataService: BaseDataFetcherService<ProductSearchResult>,
    public sharedVaribaleService: SharedVariablesService,
    public applicationStateService: ApplicationStateService,
    private _metDataService: ModifyMetaDataService
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
    this.categoryUrl = params[keys[keys.length - 1]].toString();
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

  trackByFn(index: number, item: ProductViewModel) {
    return item.id;
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
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: ProductSearchResult | undefined) => {
        const { products, totalElements, maxPrice, category } = result!;
        this.products = [...products];
        this.totalElements = totalElements;
        this.maxPrice = maxPrice;
        this.categoryId = category?.id;
        this._metDataService.setMetaData(
          category.seoTitle,
          category.seoDescription
        );
      });
  }

  public updateCurrentRoute(selectedCategory: ProductCategoryViewModel) {
    this.categoryUrl = selectedCategory.url;
    this.categoryId = selectedCategory.id;
    const newCategoryUrlSegment = this.buildNewCategoryUrlSegment();

    this._routeHandlerService.updateQueryParams(
      this._routeHandlerService.getQueryParamsSnapShot,
      `${Routing.products}/${newCategoryUrlSegment}`
    );
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
