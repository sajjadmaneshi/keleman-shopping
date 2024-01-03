import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { ArticleRepository } from '../../data/repositories/article.repository';
import { ArticleViewModel } from '../../data/view-models/article.view-model';
import { PersianDateTimeService } from '../../../../../shared/services/date-time/persian-datetime.service';
import { ArticleSimpleDataViewModel } from '../../data/view-models/article-simple-data.view-model';
import { LoadingService } from '../../../../../../common/services/loading.service';
import { HttpClientResult } from '../../../../../shared/data/models/http/http-client.result';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  pageUrl!: string;
  relatedArticles: ArticleSimpleDataViewModel[] = [];
  articleDetails!: ArticleViewModel;
  private destroy$ = new Subject<void>();
  constructor(
    private readonly _met: Meta,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _articleRepository: ArticleRepository,
    public readonly persianDateTimeService: PersianDateTimeService,
    public readonly loadingService: LoadingService
  ) {
    this._getUrlFromRoute();
  }

  private _getUrlFromRoute() {
    this._activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.pageUrl = params['url'];
        this._getArticleData();
      });
  }

  private _getArticleData() {
    this.loadingService.startLoading('read', 'articleData');
    this._articleRepository
      .getSingleArticle(this.pageUrl)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.loadingService.stopLoading('read', 'articleData'))
      )
      .subscribe({
        next: (result) => this._handleSuccessResult(result),
        error: () => this.loadingService.stopLoading('read', 'articleData'),
      });
  }

  private _handleSuccessResult(response: HttpClientResult<ArticleViewModel>) {
    this.articleDetails = response.result!;
    this._getRelatedArticles();
    this._met.updateTag({
      name: 'title',
      content: this.articleDetails.title,
    });
  }

  private _getRelatedArticles() {
    this.loadingService.startLoading('read', 'relatedArticles');
    this._articleRepository
      .getRelatedArticles(this.articleDetails.id)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.loadingService.stopLoading('read', 'relatedArticles'))
      )
      .subscribe({
        next: (result) => (this.relatedArticles = result.result!),
        error: () => this.loadingService.stopLoading('read', 'relatedArticles'),
      });
  }
}
