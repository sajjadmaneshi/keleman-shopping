import { Component } from '@angular/core';

import { PersianDateTimeService } from '../../../../../shared/services/date-time/persian-datetime.service';
import { ArticleViewModel } from '../../data/view-models/article.view-model';
import { Subject, takeUntil, tap } from 'rxjs';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { ArticleRepository } from '../../data/repositories/article.repository';
import { SharedVariablesService } from '../../../../../shared/services/shared-variables.service';

@Component({
  selector: 'keleman-latest-articles',
  templateUrl: './latest-articles.component.html',
  styleUrls: ['./latest-articles.component.scss'],
})
export class LatestArticlesComponent {
  isLoading = false;
  articles: ArticleViewModel[] = [];
  destroy$ = new Subject<void>();
  constructor(
    public persianDateTimeService: PersianDateTimeService,
    public sharedVariablesService: SharedVariablesService,
    private _articleRepository: ArticleRepository
  ) {
    this._getLatestArticles(10);
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
      .subscribe((result: HttpClientResult<ArticleViewModel[]>) => {
        this.articles = [...result.result!];
      });
  }
}
