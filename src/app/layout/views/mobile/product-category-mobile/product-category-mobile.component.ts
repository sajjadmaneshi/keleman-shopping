import { Component } from '@angular/core';
import { ProductCategoryService } from '../../shared/product-category.service';

@Component({
  selector: 'keleman-product-category-mobile',
  templateUrl: './product-category-mobile.component.html',
  styleUrls: ['./product-category-mobile.component.scss'],
  providers: [ProductCategoryService],
})
export class ProductCategoryMobileComponent {
  constructor(public productCategoryService: ProductCategoryService) {}
}
