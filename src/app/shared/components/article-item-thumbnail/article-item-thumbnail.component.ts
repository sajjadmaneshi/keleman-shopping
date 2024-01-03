import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersianDateTimeService } from '../../services/date-time/persian-datetime.service';
import { LazyLoadingDirective } from '../../directives/lazy-loading.directive';
import { ArticleSimpleDataViewModel } from '../../../layout/pages/magazine/data/view-models/article-simple-data.view-model';
import { EmptyImageDirective } from '../../directives/empty-image.directive';
import { ENVIRONMENT } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'keleman-article-item-thumbnail',
  standalone: true,
  imports: [
    CommonModule,
    LazyLoadingDirective,
    EmptyImageDirective,
    RouterLink,
  ],
  templateUrl: './article-item-thumbnail.component.html',
  styleUrls: ['./article-item-thumbnail.component.scss'],
})
export class ArticleItemThumbnailComponent {
  @Input() article!: ArticleSimpleDataViewModel;

  downloadUrl = ENVIRONMENT.downloadUrl;
  constructor(public persianDateTimeService: PersianDateTimeService) {}
}
