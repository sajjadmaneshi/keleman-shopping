import { Component, Input } from '@angular/core';
import { ArticleModel } from '../../../../../shared/models/article.model';

@Component({
  selector: 'keleman-related-article-item',
  templateUrl: './related-article-item.component.html',
  styleUrls: ['./related-article-item.component.scss'],
  standalone: true,
})
export class RelatedArticleItemComponent {
  @Input() article!: ArticleModel;
}
