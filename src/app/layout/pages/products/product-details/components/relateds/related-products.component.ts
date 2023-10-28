import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';
import { ProductViewModel } from '../../../data/models/view-models/product.view-model';
import { ProductRepository } from '../../../data/repositories/product.repository';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'keleman-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss'],
})
export class RelatedProductsComponent implements OnInit {
  products: ProductViewModel[] = [];

  constructor(
    public applicationState: ApplicationStateService,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this._productService.relatedProducts.subscribe(
      (products) => (this.products = products)
    );
  }
}
