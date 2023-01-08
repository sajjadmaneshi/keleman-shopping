import { Component, Input } from '@angular/core';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';
import { RelatedArticleModel } from '../../../../shared/models/related-article.model';
import { KelemanSwiperComponent } from '../../../../shared/components/keleman-swiper/keleman-swiper.component';
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
    KelemanSwiperComponent,
    SwiperContentDirective,
    RelatedArticleItemComponent,
    SwiperTemplateDirective,
  ],
})
export class RelatedArticlesComponent {
  isLoading = new BehaviorSubject(false);
  @Input() articles: RelatedArticleModel[] = [];
  constructor(public applicationState: ApplicationStateService) {}
}
