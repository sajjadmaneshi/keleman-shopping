import { Component, Input } from '@angular/core';
import { ProductViewModel } from '../../../data/models/view-models/product.view-model';
import { ENVIRONMENT } from '../../../../../../../environments/environment';

@Component({
  selector: 'keleman-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product!: ProductViewModel;
}
