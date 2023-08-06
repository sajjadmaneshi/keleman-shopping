import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { ArticleRepository } from '../../data/repositories/article.repository';
import { ArticleViewModel } from '../../data/view-models/article.view-model';
import { PersianDateTimeService } from '../../../../../shared/services/date-time/persian-datetime.service';
import { ENVIRONMENT } from '../../../../../../environments/environment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  pageUrl!: string;
  isLoading = true;

  currentLocationUrl: string;
  articleDetails!: ArticleViewModel;

  downloadUrl = ENVIRONMENT.downloadUrl;
  private destroy$ = new Subject<void>();
  constructor(
    private _met: Meta,
    private _activatedRoute: ActivatedRoute,

    private _location: Location,
    private _articleRepository: ArticleRepository,
    public persianDateTimeService: PersianDateTimeService
  ) {
    this._getUrlFromRoute();
    this.currentLocationUrl = this._location.path();
  }

  private _getUrlFromRoute() {
    this._activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.pageUrl = params['url'];
        this._getArticleData();
      });
  }

  ngOnInit() {}

  private _getArticleData() {
    this._articleRepository
      .getSingleArticle(this.pageUrl)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => (this.isLoading = false))
      )
      .subscribe((result) => {
        this.articleDetails = result.result!;
        this._met.updateTag({
          name: 'title',
          content: this.articleDetails.title,
        });
      });
  }

  shareOnWhatsApp() {
    let text = encodeURIComponent('Check out this page: ');
    let url = encodeURIComponent(this.pageUrl);
    let whatsappUrl = `whatsapp://send?text=${text}${url}`;
    window.open(whatsappUrl, '_blank');
  }
}
