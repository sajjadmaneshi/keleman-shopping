import { Component, Input } from '@angular/core';
import { ProductItemModel } from '../../../../shared/models/product-item.model';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'keleman-product-item-mobile',
  templateUrl: './product-item-mobile.component.html',
  imports: [DecimalPipe],
  standalone: true,
})
export class ProductItemMobileComponent {
  @Input() product!: ProductItemModel;
}
