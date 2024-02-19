import { Component, Input } from '@angular/core';
import { ProductViewModel } from '../../../products/data/models/view-models/product.view-model';
import { Routing } from '../../../../../routing';

@Component({
  selector: 'keleman-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product!: ProductViewModel;
  routing = Routing;
}
