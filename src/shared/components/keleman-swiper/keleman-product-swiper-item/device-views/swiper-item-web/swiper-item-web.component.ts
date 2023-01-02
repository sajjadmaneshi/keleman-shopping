import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemModel } from '../../../../../models/product-item.model';
import { KelemanPriceComponent } from '../../../../keleman-price/keleman-price.component';

@Component({
  selector: 'keleman-swiper-item-web',
  standalone: true,
  imports: [CommonModule, KelemanPriceComponent],

  templateUrl: './swiper-item-web.component.html',
  styles: [
    `
      .k-swiper-item {
        height: 302px !important;
        width: 250px !important;
      }
    `,
  ],
})
export class SwiperItemWebComponent {
  @Input() product!: ProductItemModel;
}
