import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersianDateTimeService } from '../../services/date-time/persian-datetime.service';
import { LazyLoadingDirective } from '../../directives/lazy-loading.directive';
import { ArticleViewModel } from '../../../layout/pages/magazine/data/view-models/article.view-model';
import { EmptyImageDirective } from '../../directives/empty-image.directive';
import { ENVIRONMENT } from '../../../../environments/environment';

@Component({
  selector: 'keleman-article-item-thumbnail',
  standalone: true,
  imports: [CommonModule, LazyLoadingDirective, EmptyImageDirective],
  templateUrl: './article-item-thumbnail.component.html',
  styleUrls: ['./article-item-thumbnail.component.scss'],
})
export class ArticleItemThumbnailComponent {
  @Input() article!: ArticleViewModel;

  downloadUrl = ENVIRONMENT.downloadUrl;
  constructor(public persianDateTimeService: PersianDateTimeService) {}
}
