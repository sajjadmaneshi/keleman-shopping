import { Component } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  providers: [ProductService],
})
export class ProductsComponent {
  constructor() {}
}
