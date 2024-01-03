import { Component, OnDestroy } from '@angular/core';

import { PersianDateTimeService } from '../../../../../shared/services/date-time/persian-datetime.service';
import { ArticleSimpleDataViewModel } from '../../data/view-models/article-simple-data.view-model';
import { Subject, takeUntil, tap } from 'rxjs';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { ArticleRepository } from '../../data/repositories/article.repository';
import { SharedVariablesService } from '../../../../../shared/services/shared-variables.service';

@Component({
  selector: 'keleman-latest-articles',
  templateUrl: './latest-articles.component.html',
  styleUrls: ['./latest-articles.component.scss'],
})
export class LatestArticlesComponent implements OnDestroy {
  isLoading = false;
  articles: ArticleSimpleDataViewModel[] = [];
  destroy$ = new Subject<void>();
  constructor(
    public persianDateTimeService: PersianDateTimeService,
    public sharedVariablesService: SharedVariablesService,
    private _articleRepository: ArticleRepository
  ) {
    this.isLoading = true;
    this._getLatestArticles(10);
  }

  private _getLatestArticles(count: number) {
    this._articleRepository
      .getLatestArticles(count)
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result: HttpClientResult<ArticleSimpleDataViewModel[]>) => {
          this.articles = [...result.result!];
        },
        error: () => (this.isLoading = false),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
