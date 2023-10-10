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
import { ProductSearchResult } from '../../../../shared/services/search.service';
import { ProductSortTypeEnum } from '../data/enums/product-sort-type .enum';
import { RouteHandlerService } from '../../../../shared/services/route-handler/route-handler.service';

@Component({
  selector: 'keleman-product-list',
  templateUrl: './product-list.component.html',
  styles: [
    `
      .empty-product-list img {
        width: 10rem;
      }
      .top-categories {
        background-image: radial-gradient(
          circle farthest-corner at 10% 20%,
          #f9e833ff 0%,
          #fac43bff 100.2%
        );
      }
    `,
  ],
  providers: [
    {
      provide: REPOSITORY_TOKEN,
      useClass: ProductRepository,
    },
    BaseDataFetcherService,
    RouteHandlerService,
  ],
})
export class ProductListComponent implements OnInit, OnDestroy {
  page = 1;
  categoryUrl!: string;
  searchText = '';
  totalElements = 0;
  maxPrice!: number;
  categoryId!: number;
  products: ProductViewModel[] = [];
  queryParams!: Params;
  sortBy: ProductSortTypeEnum = 0;
  private destroy$ = new Subject<void>();
  constructor(
    private _queryParamService: QueryParamGeneratorService,
    private _routeHandlerService: RouteHandlerService,
    public sharedVaribaleService: SharedVariablesService,
    public fetchDataService: BaseDataFetcherService<ProductSearchResult>
  ) {}

  ngOnInit(): void {
    this.fixQueryParamsOrderInUrl();
    this._getParamsFromUrl();
  }

  private _getParamsFromUrl() {
    combineLatest([
      this._routeHandlerService.getRouteParams(),
      this._routeHandlerService.getQueryParams(),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([params, queryParams]) => {
        this.queryParams = queryParams;
        this.products = [];
        this._extractCategoryUrlFromParams(params);
        this.extractPageAndSearchTextFromQueryParams(queryParams);
      });
  }

  private _extractCategoryUrlFromParams(params: Params) {
    const keys = Object.keys(params);
    this.categoryUrl = params[keys[keys.length - 1]].toString();
  }

  private _parseQueryParams(urlQueryParams: Params) {
    const page = Number(urlQueryParams['p']) ?? 0;
    const { p, ...restUrlQueryParams } = urlQueryParams;
    this.searchText = urlQueryParams['q'];
    this.sortBy = urlQueryParams['sortBy'] ?? 0;
    return { page, restUrlQueryParams };
  }

  private extractPageAndSearchTextFromQueryParams(urlQueryParams: Params) {
    const { page, restUrlQueryParams } = this._parseQueryParams(urlQueryParams);
    const queryParams = {
      catUrl: this.categoryUrl,
      offset: page,
      limit: 10,
      q: this.searchText,
      ...restUrlQueryParams,
    };
    this._getAllProducts(queryParams);
  }

  fixQueryParamsOrderInUrl() {
    this._routeHandlerService.updateQueryParams(
      this._queryParamService.sortQuryParams(
        this._routeHandlerService.getQueryParamsSnapShot
      )
    );
  }

  trackByFn(index: number, item: ProductViewModel) {
    return item.id;
  }

  pageChange($event: number) {
    this.page = $event;
    this._updateRoute({ p: this.page - 1 });
  }

  private _updateRoute(queryParams: Params) {
    this._routeHandlerService.updateQueryParams({ p: this.page - 1 });
  }

  onSelectSort($event: ProductSortTypeEnum) {
    this.queryParams = this._queryParamService.sortQuryParams({
      ...this.queryParams,
      sortBy: $event,
    });
    this._routeHandlerService.updateQueryParams(this.queryParams);
  }

  private _getAllProducts(params: { [key: string]: any }) {
    this.fetchDataService
      .fetchData(params)
      .subscribe((result: ProductSearchResult | undefined) => {
        this.products = [...result?.products!];
        this.totalElements = result?.totalElements!;
        this.maxPrice = result?.maxPrice!;
        this.categoryId = result?.category?.id!;
      });
  }

  public updateCurrentRoute(selectedCategory: ProductCategoryViewModel) {
    this.categoryUrl = selectedCategory.url;
    this.categoryId = selectedCategory.id;
    const newCategoryUrlSegment = this.buildNewCategoryUrlSegment();
    this.navigateToUpdatedRoute(newCategoryUrlSegment);
  }

  private buildNewCategoryUrlSegment(): string {
    const currentParams = this._routeHandlerService.getRouteParamsSnapShot();
    const catUrl1 = currentParams['catUrl1'] || '';
    const catUrl2 = currentParams['catUrl2'] || '';
    const newCategoryUrlSegment =
      `${catUrl1}/${catUrl2}/${this.categoryUrl}`.replace(/\/{2,}/g, '/');
    return newCategoryUrlSegment;
  }

  private navigateToUpdatedRoute(newCategoryUrlSegment: string) {
    const queryParams = { p: '0' };
    this._routeHandlerService.updateQueryParams(
      queryParams,
      `${Routing.products}/${newCategoryUrlSegment}`
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
