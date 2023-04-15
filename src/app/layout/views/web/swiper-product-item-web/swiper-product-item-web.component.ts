import { Component, Input } from '@angular/core';
import { ProductItemModel } from '../../../../shared/models/product-item.model';
import { PriceComponent } from '../../../../shared/components/price/price.component';

@Component({
  selector: 'swiper-product-item-web',
  templateUrl: './swiper-product-item-web.component.html',
  standalone: true,
  styles: [
    `
      .k-swiper-item {
        height: 250px !important;
        max-width: 200px !important;
      }
    `,
  ],
  imports: [PriceComponent],
})
export class SwiperProductItemWebComponent {
  @Input() product!: ProductItemModel;
}
