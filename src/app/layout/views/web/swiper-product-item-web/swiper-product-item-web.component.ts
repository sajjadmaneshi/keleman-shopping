import { Component, Input } from '@angular/core';
import { ProductItemModel } from '../../../../shared/models/product-item.model';
import { KelemanPriceComponent } from '../../../../shared/components/keleman-price/keleman-price.component';

@Component({
  selector: 'keleman-swiper-product-item-web',
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
  imports: [KelemanPriceComponent],
})
export class SwiperProductItemWebComponent {
  @Input() product!: ProductItemModel;
}
