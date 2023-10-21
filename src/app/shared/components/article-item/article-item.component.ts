import { Component, Input } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { PersianDateTimeService } from '../../services/date-time/persian-datetime.service';
import { LazyLoadingDirective } from '../../directives/lazy-loading.directive';
import { RouterModule } from '@angular/router';
import { ArticleSimpleDataViewModel } from '../../../layout/pages/magazine/data/view-models/article-simple-data-view.model';
import { EmptyImageDirective } from '../../directives/empty-image.directive';
import { ENVIRONMENT } from '../../../../environments/environment';

@Component({
  selector: 'keleman-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatIconModule,
    LazyLoadingDirective,
    RouterModule,
    EmptyImageDirective,
    NgOptimizedImage,
  ],
})
export class ArticleItemComponent {
  @Input() articleDetails!: ArticleSimpleDataViewModel;

  dwonloadUrl: string = ENVIRONMENT.downloadUrl;
  constructor(public persianDateTime: PersianDateTimeService) {}
}
