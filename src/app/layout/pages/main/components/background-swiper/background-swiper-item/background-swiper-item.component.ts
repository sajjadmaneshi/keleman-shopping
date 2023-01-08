import { Component, Input } from '@angular/core';
import { ProductViewModel } from '../amazing-offer-swiper/data/models/product.view-model';

@Component({
  selector: 'keleman-background-swiper-item',
  templateUrl: './background-swiper-item.component.html',
  styleUrls: ['./background-swiper-item.component.scss'],
})
export class BackgroundSwiperItemComponent {
  @Input() product!: ProductViewModel;
}
