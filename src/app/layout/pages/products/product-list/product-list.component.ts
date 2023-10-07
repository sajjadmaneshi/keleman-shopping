import { Component, InjectionToken, OnDestroy, OnInit } from '@angular/core';
import { ProductViewModel } from '../data/models/view-models/product.view-model';
import { combineLatest, Subject, takeUntil, tap } from 'rxjs';
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
  ],
})
export class ProductListComponent implements OnInit, OnDestroy {
  page = 1;
  categoryUrl!: string;
  categoryDetail!: CategorySimpleInfoViewModel;
  searchText = '';
  totalElements = 0;
  categoryId!: number;
  products: ProductViewModel[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private queryParamService: QueryParamGeneratorService,
    public sharedVaribaleService: SharedVariablesService,
    public fetchDataService: BaseDataFetcherService<ProductSearchResult>
  ) {}

  ngOnInit(): void {
    this.products = [];
    this.fixQueryParamsOrderInUrl();
    this._getParamsFromUrl();
  }

  private _getParamsFromUrl() {
    combineLatest([this._activeRoute.params, this._activeRoute.queryParams])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([params, queryParams]) => {
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
    const searchText = urlQueryParams['q'];
    return { page, searchText, restUrlQueryParams };
  }

  private extractPageAndSearchTextFromQueryParams(urlQueryParams: Params) {
    const { page, searchText, restUrlQueryParams } =
      this._parseQueryParams(urlQueryParams);
    const queryParams = {
      catUrl: this.categoryUrl,
      offset: page,
      limit: 10,
      q: searchText,
      ...restUrlQueryParams,
    };
    this._getAllProducts(queryParams);
  }

  private _updateQueryParams() {
    const queryParams = { p: this.page - 1 };
    this._router.navigate([], {
      relativeTo: this._activeRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  fixQueryParamsOrderInUrl() {
    const queryParams = this._activeRoute.snapshot.queryParams;
    this._router.navigate([], {
      relativeTo: this._activeRoute,
      queryParams: this.queryParamService.sortQuryParams(queryParams),
    });
  }

  trackByFn(index: number, item: ProductViewModel) {
    return item.id;
  }

  pageChange($event: number) {
    this.page = $event;
    this._updateQueryParams();
  }

  private _getAllProducts(params: { [key: string]: any }) {
    this.fetchDataService
      .fetchData(params)
      .subscribe((result: ProductSearchResult | undefined) => {
        this.products = [...result?.products!];
        this.totalElements = result?.totalElements!;
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
    const currentParams = this._activeRoute.snapshot.params;
    const catUrl1 = currentParams['catUrl1'] || '';
    const catUrl2 = currentParams['catUrl2'] || '';
    const newCategoryUrlSegment =
      `${catUrl1}/${catUrl2}/${this.categoryUrl}`.replace(/\/{2,}/g, '/');
    return newCategoryUrlSegment;
  }

  private navigateToUpdatedRoute(newCategoryUrlSegment: string) {
    const queryParams = { p: '0' };
    this._router.navigate([`${Routing.products}/${newCategoryUrlSegment}`], {
      queryParams,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
