import { Component, OnDestroy, OnInit } from '@angular/core';
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
})
export class ProductListComponent implements OnInit, OnDestroy {
  isLoading = false;
  totalElements = 0;
  page = 1;
  categoryId!: number;
  categoryUrl!: string;
  categoryDetail!: CategorySimpleInfoViewModel;
  products: ProductViewModel[] = [];
  searchText = '';

  private destroy$ = new Subject<void>();
  constructor(
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _productsRepository: ProductRepository,
    private queryParamService: QueryParamGeneratorService,
    public sharedVaribaleService: SharedVariablesService
  ) {}

  private _getParamsFromUrl() {
    combineLatest([this._activeRoute.params, this._activeRoute.queryParams])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([params, queryParams]) => {
        this.products = [];
        this.extractCategoryUrlFromParams(params);
        this.extractPageAndSearchTextFromQueryParams(queryParams);
      });
  }

  private extractCategoryUrlFromParams(params: Params) {
    const urlParams = ['catUrl1', 'catUrl2', 'catUrl3'];
    for (const key of urlParams) {
      if (params[key]) this.categoryUrl = params[key];
    }
  }

  private extractPageAndSearchTextFromQueryParams(queryParams: Params) {
    const page = Number(queryParams['p']);
    this.searchText = queryParams['q'];
    if (!isNaN(page)) {
      this.page = page + 1;
      this.getAllProducts(this.searchText, page);
    }
  }

  ngOnInit(): void {
    this.products = [];
    this.fixQueryParamsOrderInUrl();
    this._getParamsFromUrl();
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

  getAllProducts(search: string, page: number) {
    this.isLoading = true;
    this._productsRepository
      .search(this.categoryUrl, page, 10, search)
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (
          result: HttpClientResult<{
            products: ProductViewModel[];
            totalElements: number;
            category: { id: number; title: string };
          }>
        ) => {
          this.products = [...result.result?.products!];
          this.totalElements = result.result?.totalElements!;
          this.categoryId = result.result?.category?.id!;
        }
      );
  }

  pageChange($event: number) {
    this.page = $event;
    this._updateQueryParams();
  }

  private _updateQueryParams() {
    const queryParams = { p: this.page - 1 };
    this._router.navigate([], {
      relativeTo: this._activeRoute,
      queryParams,
      queryParamsHandling: 'merge',
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
