import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { ArticleRepository } from '../../data/repositories/article.repository';
import { ArticleViewModel } from '../../data/view-models/article.view-model';
import { PersianDateTimeService } from '../../../../../shared/services/date-time/persian-datetime.service';
import { ENVIRONMENT } from '../../../../../../environments/environment';
import { ArticleSimpleDataViewModel } from '../../data/view-models/article-simple-data-view.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  pageUrl!: string;
  isLoading = true;

  relatedArticles: ArticleSimpleDataViewModel[] = [];
  articleDetails!: ArticleViewModel;

  downloadUrl = ENVIRONMENT.downloadUrl;
  private destroy$ = new Subject<void>();
  constructor(
    private _met: Meta,
    private _activatedRoute: ActivatedRoute,

    private _articleRepository: ArticleRepository,
    public persianDateTimeService: PersianDateTimeService
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
    this._articleRepository
      .getSingleArticle(this.pageUrl)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => (this.isLoading = false))
      )
      .subscribe((result) => {
        this.articleDetails = result.result!;
        this._getRelatedArticles();
        this._met.updateTag({
          name: 'title',
          content: this.articleDetails.title,
        });
      });
  }

  private _getRelatedArticles() {
    this._articleRepository
      .getRelatedArticles(this.articleDetails.id)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => (this.isLoading = false))
      )
      .subscribe((result) => {
        this.relatedArticles = result.result!;
      });
  }
}
