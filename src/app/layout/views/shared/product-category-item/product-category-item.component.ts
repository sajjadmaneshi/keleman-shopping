import { Component, Input } from '@angular/core';
import { CategoryModel } from '../../../../../shared/models/category.model';

@Component({
  selector: 'app-product-category-item',
  templateUrl: './product-category-item.component.html',
})
export class ProductCategoryItemComponent {
  @Input() category!: CategoryModel;
}
