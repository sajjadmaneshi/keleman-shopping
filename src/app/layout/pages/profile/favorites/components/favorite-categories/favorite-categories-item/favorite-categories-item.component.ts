import { Component, Input } from '@angular/core';

@Component({
  selector: 'keleman-favorite-categories-item',
  templateUrl: './favorite-categories-item.component.html',
  styleUrls: ['./favorite-categories-item.component.scss'],
})
export class FavoriteCategoriesItemComponent {
  @Input() data: any;
}
