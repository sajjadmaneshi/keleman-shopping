import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'keleman-product-specifications',
  templateUrl: './product-specifications.component.html',
})
export class ProductSpecificationsComponent {
  constructor(private _productService: ProductService) {
    this._productService.getProductDescriptions();
  }
}
