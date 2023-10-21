import { Component, InjectionToken, OnInit } from '@angular/core';
import { ArticleSimpleDataViewModel } from '../../data/view-models/article-simple-data-view.model';
import { Subject, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { ArticleRepository } from '../../data/repositories/article.repository';
import { SharedVariablesService } from '../../../../../shared/services/shared-variables.service';
import {
  BaseDataFetcherService,
  REPOSITORY_TOKEN,
} from '../../../../../shared/services/base-data-fetcher.service';
import { ArticleSearchResult } from '../../../../../shared/services/search.service';
import { ProductRepository } from '../../../products/data/repositories/product.repository';

@Component({
  selector: 'app-main-page-latest-articles-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  providers: [
    {
      provide: REPOSITORY_TOKEN,
      useClass: ArticleRepository,
    },
    BaseDataFetcherService,
  ],
})
export class ArticleListComponent implements OnInit {
  articles: ArticleSimpleDataViewModel[] = [];
  totalElements = 0;
  page = 1;
  private destroy$ = new Subject<void>();

  constructor(
    public sharedVariableService: SharedVariablesService,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    public fetchDataService: BaseDataFetcherService<ArticleSearchResult>
  ) {}

  ngOnInit(): void {
    this.articles = [];
    this._getParamsFromUrl();
  }

  private _getParamsFromUrl() {
    this._activeRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((queryParams) => {
        this.articles = [];
        const page = Number(queryParams['p']) ?? 0;
        const search = queryParams['q'] ?? '';
        this.page = page + 1;
        this.getAllArticles(search, page);
      });
  }

  trackByFn(index: number, item: ArticleSimpleDataViewModel) {
    return item.id;
  }

  getAllArticles(search: string, page: number) {
    const params = {
      offset: page,
      limit: 10,
      q: search,
    };
    this.fetchDataService
      .fetchData(params)
      .subscribe((result: ArticleSearchResult | undefined) => {
        this.articles = [...result?.articles!];
        this.totalElements = result?.totalElements!;
      });
  }

  pageChange($event: number) {
    this.page = $event;
    this._updateQueryParams();
  }

  private _updateQueryParams() {
    const queryParams = { p: this.page - 1 };
    this._router
      .navigate([], {
        relativeTo: this._activeRoute,
        queryParams,
        queryParamsHandling: 'merge',
      })
      .finally();
  }
}
