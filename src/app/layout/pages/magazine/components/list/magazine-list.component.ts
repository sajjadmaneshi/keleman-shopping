import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleSimpleDataViewModel } from '../../data/view-models/article-simple-data.view-model';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { Params } from '@angular/router';
import { ArticleRepository } from '../../data/repositories/article.repository';
import { SharedVariablesService } from '../../../../../shared/services/shared-variables.service';
import {
  BaseDataFetcherService,
  REPOSITORY_TOKEN,
} from '../../../../../shared/services/base-data-fetcher.service';
import { ArticleSearchResult } from '../../../../../shared/services/search.service';
import { RouteHandlerService } from '../../../../../shared/services/route-handler/route-handler.service';
import { QueryParamGeneratorService } from '../../../../../shared/services/query-params-generator.service';
import { ModifyMetaDataService } from '../../../../../../common/services/modify-meta-data.service';

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
    ModifyMetaDataService,
  ],
})
export class MagazineListComponent implements OnInit, OnDestroy {
  articles: ArticleSimpleDataViewModel[] = [];
  totalElements = 0;
  searchText = '';
  page = 1;
  limit = 12;
  categoryUrl: string = '';
  categoryId!: number;
  private destroy$ = new Subject<void>();

  constructor(
    private readonly _queryParamService: QueryParamGeneratorService,
    private readonly _routeHandlerService: RouteHandlerService,
    private readonly _metaDataService: ModifyMetaDataService,
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

  getAllArticles(params: { [key: string]: any }) {
    this.fetchDataService
      .fetchData(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: ArticleSearchResult | undefined) => {
        const { articles, totalElements, category } = result!;
        this.articles = [...articles!];
        this.totalElements = totalElements!;
        this.categoryId = category?.id!;
        this._metaDataService.setMetaData(
          category?.seoTitle,
          category?.seoDescription
        );
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
