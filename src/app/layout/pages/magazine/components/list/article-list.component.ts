import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ArticleSimpleDataViewModel } from '../../data/view-models/article-simple-data-view.model';
import { Subject, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { ArticleRepository } from '../../data/repositories/article.repository';
import { SharedVariablesService } from '../../../../../shared/services/shared-variables.service';
import { ProductViewModel } from '../../../products/data/models/view-models/product.view-model';

@Component({
  selector: 'app-main-page-latest-articles-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  articles: ArticleSimpleDataViewModel[] = [];
  isLoading = false;
  totalElements = 0;
  page = 1;
  private destroy$ = new Subject<void>();

  constructor(
    public sharedVariableService: SharedVariablesService,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _articleRepository: ArticleRepository
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
        const page = Number(queryParams['p']);
        const search = queryParams['q'];
        if (!isNaN(page)) {
          this.page = page + 1;
          this.getAllArticles('', page);
        } else {
          this._updateQueryParams();
          this.getAllArticles('', 1);
        }
        if (search) this.getAllArticles(search, page);
      });
  }

  trackByFn(index: number, item: ArticleSimpleDataViewModel) {
    return item.id;
  }

  getAllArticles(search: string, page: number) {
    this.isLoading = true;
    this._articleRepository
      .search(undefined, page, 10, search)
      .pipe(
        tap(() => setTimeout(() => (this.isLoading = false), 1500)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (
          result: HttpClientResult<{
            articles: ArticleSimpleDataViewModel[];
            totalElements: number;
            category: { id: number; title: string };
          }>
        ) => {
          this.articles = [...result.result?.articles!];
          this.totalElements = result.result?.totalElements!;
        }
      );
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
