import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductViewModel } from '../../../data/models/view-models/product.view-model';

@Component({
  selector: 'keleman-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent {
  @Input() product!: ProductViewModel;
}
