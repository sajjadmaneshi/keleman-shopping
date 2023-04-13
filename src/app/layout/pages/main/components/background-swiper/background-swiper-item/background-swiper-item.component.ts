import { Component, Input } from '@angular/core';
import { ProductViewModel } from '../../../../products/data/models/view-models/product.view-model';

@Component({
  selector: 'keleman-background-swiper-item',
  templateUrl: './background-swiper-item.component.html',
  styleUrls: ['./background-swiper-item.component.scss'],
})
export class BackgroundSwiperItemComponent {
  @Input() product!: ProductViewModel;
}
