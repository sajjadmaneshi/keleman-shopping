import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'keleman-product-introduction',
  templateUrl: './product-introduction.component.html',
  styles: [
    `
      .product-checking {
        min-height: 100%;
        overflow: auto;
      }
    `,
  ],
})
export class ProductIntroductionComponent implements OnInit {
  introduction: string = '';
  constructor(private _productService: ProductService) {}
  ngOnInit(): void {
    this._productService.productDescriptions.subscribe(
      (result) => (this.introduction = result.description)
    );
  }
}
