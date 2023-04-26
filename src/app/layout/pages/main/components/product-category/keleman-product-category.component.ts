import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductCategoryService } from './product-category.service';

@Component({
  selector: 'keleman-product-category',
  templateUrl: './keleman-product-category.component.html',
  styleUrls: ['./keleman-product-category.component.scss'],
  providers: [ProductCategoryService],
})
export class KelemanProductCategoryComponent {
  isLoading = new BehaviorSubject(false);
  constructor(public productCategoryService: ProductCategoryService) {}
}
