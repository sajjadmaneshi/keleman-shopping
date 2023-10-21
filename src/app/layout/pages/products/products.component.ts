import { Component } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  providers: [ProductService],
})
export class ProductsComponent {
  constructor() {}
}
