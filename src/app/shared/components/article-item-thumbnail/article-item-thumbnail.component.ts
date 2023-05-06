import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleModel } from '../../models/article.model';
import { PersianDateTimeService } from '../../services/date-time/persian-datetime.service';
import { LazyLoadingDirective } from '../../directives/lazy-loading.directive';

@Component({
  selector: 'keleman-article-item-thumbnail',
  standalone: true,
  imports: [CommonModule, LazyLoadingDirective],
  templateUrl: './article-item-thumbnail.component.html',
  styleUrls: ['./article-item-thumbnail.component.scss'],
})
export class ArticleItemThumbnailComponent {
  @Input() article!: ArticleModel;
  constructor(public persianDateTimeService: PersianDateTimeService) {}
}
