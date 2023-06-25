import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ProductViewModel } from '../data/models/view-models/product.view-model';
import { combineLatest, Subject, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRepository } from '../data/repositories/product.repository';
import { HttpClientResult } from '../../../../shared/models/http/http-client.result';
import { SharedVariablesService } from '../../../../shared/services/shared-variables.service';
import { ProductCategoryViewModel } from 'src/app/shared/models/view-models/product-category.view-model';
import { Routing } from '../../../../routing';
import { CategorySimpleInfoViewModel } from '../data/models/view-models/category-simple-info.view-model';

@Component({
  selector: 'keleman-product-list',
  templateUrl: './product-list.component.html',
  styles: [
    `
      .empty-product-list img {
        width: 10rem;
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

  private destroy$ = new Subject<void>();
  constructor(
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _productsRepository: ProductRepository,
    public sharedVaribaleServie: SharedVariablesService
  ) {}

  private _getParamsFromUrl() {
    combineLatest([this._activeRoute.params, this._activeRoute.queryParams])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([params, queryParams]) => {
        this.products = [];
        const urlParams = ['catUrl1', 'catUrl2', 'catUrl3'];
        urlParams.forEach((param) => {
          if (params[param]) this.categoryUrl = params[param];
        });

        const page = Number(queryParams['p']);
        if (!isNaN(page)) {
          this.page = page + 1;
          this.getAllProducts(page);
        }
      });
  }

  ngOnInit(): void {
    this.products = [];
    this._getParamsFromUrl();
  }

  getAllProducts(page: number) {
    this.isLoading = true;
    this._productsRepository
      .search(this.categoryUrl, page, 10)
      .pipe(
        tap(() => setTimeout(() => (this.isLoading = false), 1500)),
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public updateCurrentRoute(selectedCategory: ProductCategoryViewModel) {
    this.categoryUrl = selectedCategory.url;
    const queryParams = { p: '0' };

    this._activeRoute.params.subscribe((params) => {
      this.categoryId = selectedCategory.id;
      const params$ = `${params['catUrl1'] ?? ''}/${params['catUrl2'] ?? ''}/${
        this.categoryUrl
      }`.replace(/\/{2,}/g, '/');
      this._router.navigate([`${Routing.products}/${params$}`], {
        queryParams,
      });
    });
  }
}
