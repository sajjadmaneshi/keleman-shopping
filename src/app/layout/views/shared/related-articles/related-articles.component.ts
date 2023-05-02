import { Component, Input } from '@angular/core';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';
import { ArticleModel } from '../../../../shared/models/article.model';
import { SwiperComponent } from '../../../../shared/components/swiper/swiper.component';
import {
  SwiperContentDirective,
  SwiperTemplateDirective,
} from '../../../../shared/directives/swiper-template.directive';
import { RelatedArticleItemComponent } from './related-articles-item/related-article-item.component';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'keleman-related-articles',
  templateUrl: './related-articles.component.html',
  styleUrls: ['./related-articles.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SwiperComponent,
    SwiperContentDirective,
    RelatedArticleItemComponent,
    SwiperTemplateDirective,
  ],
})
export class RelatedArticlesComponent {
  isLoading = new BehaviorSubject(false);
  @Input() articles: ArticleModel[] = [];
  constructor(public applicationState: ApplicationStateService) {}
}
