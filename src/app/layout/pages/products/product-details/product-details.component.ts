import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  isFavorite = new BehaviorSubject(false);

  addToFavorite() {
    this.isFavorite.next(true);
  }
  removeFromFavorite() {
    this.isFavorite.next(false);
  }
}
