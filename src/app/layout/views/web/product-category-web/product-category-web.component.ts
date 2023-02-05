import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductCategoryService } from '../../shared/product-category.service';

@Component({
  selector: 'keleman-product-category-web',
  templateUrl: './product-category-web.component.html',
  styleUrls: ['./product-category-web.component.scss'],
  providers: [ProductCategoryService],
})
export class ProductCategoryWebComponent {
  isLoading = new BehaviorSubject(false);

  constructor(public productCategoryService: ProductCategoryService) {}
}
