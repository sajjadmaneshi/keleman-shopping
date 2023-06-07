import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ArticleModel } from '../../models/article.model';
import { PersianDateTimeService } from '../../services/date-time/persian-datetime.service';
import { LazyLoadingDirective } from '../../directives/lazy-loading.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'keleman-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss'],
  standalone: true,
  imports: [NgIf, MatIconModule, LazyLoadingDirective, RouterModule],
})
export class ArticleItemComponent {
  @Input() articleDetails!: ArticleModel;
  constructor(public persianDateTime: PersianDateTimeService) {}
}
