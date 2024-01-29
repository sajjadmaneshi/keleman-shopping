import { Component } from '@angular/core';

import { ProductCategoryViewModel } from '../shared/data/models/view-models/product-category.view-model';
import { ProductCategoryService } from '../shared/components/product-category/product-category.service';

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
