import { Component } from '@angular/core';
import { ProductCategoryService } from './components/product-category/product-category.service';
import { ProductCategoryViewModel } from '../shared/data/models/view-models/product-category.view-model';

@Component({
  selector: 'keleman-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private _categoryService: ProductCategoryService) {}
  navigateToPage($event: ProductCategoryViewModel) {
    this._categoryService.onNavigate({ c1: $event.url });
  }
}
