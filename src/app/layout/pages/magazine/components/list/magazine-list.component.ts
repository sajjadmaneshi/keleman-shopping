import { Component, InjectionToken, OnInit } from '@angular/core';
import { ArticleSimpleDataViewModel } from '../../data/view-models/article-simple-data-view.model';
import { combineLatest, Subject, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { ArticleRepository } from '../../data/repositories/article.repository';
import { SharedVariablesService } from '../../../../../shared/services/shared-variables.service';
import {
  BaseDataFetcherService,
  REPOSITORY_TOKEN,
} from '../../../../../shared/services/base-data-fetcher.service';
import { ArticleSearchResult } from '../../../../../shared/services/search.service';
import { ProductRepository } from '../../../products/data/repositories/product.repository';
import { RouteHandlerService } from '../../../../../shared/services/route-handler/route-handler.service';
import { BreadCrumbViewModel } from '../../../../../home/data/view-models/bread-crumb.view-model';
import { QueryParamGeneratorService } from '../../../../../shared/services/query-params-generator.service';
import { Routing } from '../../../../../routing';

@Component({
  selector: 'app-main-page-latest-articles-list',
  templateUrl: './magazine-list.component.html',
  styleUrls: ['./magazine-list.component.scss'],
  providers: [
    {
      provide: REPOSITORY_TOKEN,
      useClass: ArticleRepository,
    },
    BaseDataFetcherService,
    RouteHandlerService,
  ],
})
export class MagazineListComponent implements OnInit {
  articles: ArticleSimpleDataViewModel[] = [];
  totalElements = 0;
  searchText = '';
  page = 1;
  limit = 12;
  private destroy$ = new Subject<void>();
  categoryUrl: string = '';
  categoryId!: number;

  constructor(
    private readonly _queryParamService: QueryParamGeneratorService,
    private readonly _routeHandlerService: RouteHandlerService,
    public readonly fetchDataService: BaseDataFetcherService<ArticleSearchResult>,
    public readonly sharedVariableService: SharedVariablesService
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
        this.articles = [];
        this.categoryUrl = params['categoryUrl'] ?? '';
        this._extractPageAndSearchTextFromQueryParams(queryParams);
      });
  }

  private _parseQueryParams(urlQueryParams: Params) {
    if (urlQueryParams['p']) this.page = Number(urlQueryParams['p']) + 1;
    const { p, ...restUrlQueryParams } = urlQueryParams;
    this.searchText = urlQueryParams['q'];
    return restUrlQueryParams;
  }

  private _extractPageAndSearchTextFromQueryParams(urlQueryParams: Params) {
    const queryParams = {
      catUrl: this.categoryUrl,
      offset: this.page - 1,
      limit: this.limit,
      ...this._parseQueryParams(urlQueryParams),
    };
    this.getAllArticles(queryParams);
  }

  trackByFn(index: number, item: ArticleSimpleDataViewModel) {
    return item.id;
  }

  getAllArticles(params: { [key: string]: any }) {
    this.fetchDataService
      .fetchData(params)
      .subscribe((result: ArticleSearchResult | undefined) => {
        this.articles = [...result?.articles!];
        this.totalElements = result?.totalElements!;
        this.categoryId = result?.category?.id!;
      });
  }

  pageChange($event: number) {
    this.page = $event;
    const queryParams = { p: this.page - 1 };
    this._routeHandlerService.updateQueryParams({
      ...this._routeHandlerService.getQueryParamsSnapShot,
      ...queryParams,
    });
  }
}
