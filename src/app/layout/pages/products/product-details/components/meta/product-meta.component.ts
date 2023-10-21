import { Component, Input } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductRepository } from '../../../data/repositories/product.repository';
import { Subscription, tap } from 'rxjs';
import { ProductSpecificViewModel } from '../../../data/models/view-models/product-specific.view-model';
import { SharedVariablesService } from '../../../../../../shared/services/shared-variables.service';

@Component({
  selector: 'keleman-product-meta',
  templateUrl: './product-meta.component.html',
  styleUrls: ['./product-meta.component.scss'],
})
export class ProductMetaComponent {
  isLoading = true;
  specifications!: ProductSpecificViewModel[];
  subscription!: Subscription;
  constructor(
    private _productService: ProductService,
    private _productRepository: ProductRepository,
    public sharedVariableService: SharedVariablesService
  ) {
    this._getProductSpecification();
  }
  @Input() details!: { price: number; currentStock: number };

  private _getProductSpecification() {
    this.subscription = this._productRepository
      .getProductSpecifics(this._productService.productUrl)
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe((result) => {
        this.specifications = [...result.result!];
      });
  }
}
