import { Component, OnDestroy } from '@angular/core';
import { ArticleRepository } from '../../../layout/pages/magazine/data/repositories/article.repository';
import { ArticleSimpleDataViewModel } from '../../../layout/pages/magazine/data/view-models/article-simple-data-view.model';
import { Subject, takeUntil, tap } from 'rxjs';
import { HttpClientResult } from '../../../shared/data/models/http/http-client.result';
import { Router } from '@angular/router';

@Component({
  selector: 'keleman-main-page-latest-articles',
  templateUrl: './main-page-latest-articles.component.html',
})
export class MainPageLatestArticlesComponent implements OnDestroy {
  isLoading = false;

  articles!: ArticleSimpleDataViewModel[];
  destroy$ = new Subject<void>();

  constructor(private _articleRepository: ArticleRepository) {
    this._getLatestArticles(4);
  }

  private _getLatestArticles(count: number) {
    this.isLoading = true;
    this._articleRepository
      .getLatestArticles(count)
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
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
