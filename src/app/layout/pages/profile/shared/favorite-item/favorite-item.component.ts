import { Component, Input } from '@angular/core';
import { ProductViewModel } from '../../../products/data/models/view-models/product.view-model';

@Component({
  selector: 'keleman-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.scss'],
})
export class FavoriteItemComponent {
  @Input() productDetails!: ProductViewModel;
}
