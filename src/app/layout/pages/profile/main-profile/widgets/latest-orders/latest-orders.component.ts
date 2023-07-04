import { Component } from '@angular/core';
import { ProductViewModel } from '../../../../products/data/models/view-models/product.view-model';

@Component({
  selector: 'keleman-latest-orders',
  templateUrl: './latest-orders.component.html',
  styleUrls: ['./latest-orders.component.scss'],
})
export class LatestOrdersComponent {
  slides: ProductViewModel[] = [];
}
