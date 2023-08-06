import { Component, OnDestroy } from '@angular/core';

import { ArticleRepository } from '../../../magazine/data/repositories/article.repository';
import { ArticleSimpleDataViewModel } from '../../../magazine/data/view-models/article-simple-data-view.model';
import { Subject, takeUntil, tap } from 'rxjs';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';
import { Routing } from '../../../../../routing';
import { Router } from '@angular/router';

@Component({
  selector: 'keleman-magazine',
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.scss'],
})
export class MagazineComponent implements OnDestroy {
  isLoading = false;

  articles!: ArticleSimpleDataViewModel[];
  destroy$ = new Subject<void>();

  constructor(
    private _articleRepository: ArticleRepository,
    private _router: Router
  ) {
    this._getLatestArticles(4);
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

  navigateToArticleList() {
    this._router.navigate([`${Routing.magazine}`], { queryParams: { p: '0' } });
  }
}
