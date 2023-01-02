import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemModel } from '../../../../../models/product-item.model';

@Component({
  selector: 'keleman-swiper-item-mobile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-item-mobile.component.html',
})
export class CarouselItemMobileComponent {
  @Input() product!: ProductItemModel;
}
