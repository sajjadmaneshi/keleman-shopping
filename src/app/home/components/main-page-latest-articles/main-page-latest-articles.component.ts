import { Component, OnDestroy } from '@angular/core';

import { ArticleRepository } from '../../../layout/pages/magazine/data/repositories/article.repository';
import { ArticleSimpleDataViewModel } from '../../../layout/pages/magazine/data/view-models/article-simple-data-view.model';
import { Subject, takeUntil, tap } from 'rxjs';
import { HttpClientResult } from '../../../shared/data/models/http/http-client.result';
import { Routing } from '../../../routing';
import { Router } from '@angular/router';
import { ProductViewModel } from '../../../layout/pages/products/data/models/view-models/product.view-model';

@Component({
  selector: 'keleman-main-page-latest-articles',
  templateUrl: './main-page-latest-articles.component.html',
})
export class MainPageLatestArticlesComponent implements OnDestroy {
  isLoading = false;

  articles!: ArticleSimpleDataViewModel[];
  destroy$ = new Subject<void>();

  constructor(
    private _articleRepository: ArticleRepository,
    private _router: Router
  ) {
    this._getLatestArticles(4);
  }

  tranckByFn(index: number, item: ArticleSimpleDataViewModel) {
    return item.id;
  }

  private _getLatestArticles(count: number) {
    this.isLoading = true;
    this._articleRepository
      .getLatestArticles(count)
      .pipe(
        tap(
          () => setTimeout(() => (this.isLoading = false), 1500),
          takeUntil(this.destroy$)
        )
      )
      .subscribe((result: HttpClientResult<ArticleSimpleDataViewModel[]>) => {
        this.articles = [...result.result!];
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
