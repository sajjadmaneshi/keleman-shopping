import { Component, Input } from '@angular/core';
import { ProductRepository } from '../../../data/repositories/product.repository';
import { ProductDescriptionsViewModel } from '../../../data/models/view-models/product-descriptions.view-model';
import { map, Subscription, tap } from 'rxjs';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'keleman-product-specifications',
  templateUrl: './product-specifications.component.html',
})
export class ProductSpecificationsComponent {
  isLoading = true;

  productDescriptions!: ProductDescriptionsViewModel;

  subscription!: Subscription;
  constructor(private _productService: ProductService) {
    this._productService.getProductDescriptions();
  }
}
