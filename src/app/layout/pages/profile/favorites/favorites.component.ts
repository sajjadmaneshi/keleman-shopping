import { Component } from '@angular/core';
import { ProductViewModel } from '../../products/data/models/view-models/product.view-model';

@Component({
  selector: 'keleman-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  favoriteItems: ProductViewModel[] = [];
}
