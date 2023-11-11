import { Component } from '@angular/core';
import { ProductCommentViewModel } from '../../../../shared/data/models/product-comment.view-model';

@Component({
  selector: 'keleman-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.scss'],
})
export class UserCommentsComponent {
  comments: ProductCommentViewModel[] = [];
}
