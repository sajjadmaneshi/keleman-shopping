import { Component, Input } from '@angular/core';
import { ProductItemModel } from '../../../../../../shared/models/product-item.model';

@Component({
  selector: 'keleman-background-swiper-item',
  templateUrl: './background-swiper-item.component.html',
  styleUrls: ['./background-swiper-item.component.scss'],
})
export class BackgroundSwiperItemComponent {
  @Input() product!: ProductItemModel;
}
