import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationStateService } from '../../../services/application-state.service';
import { CarouselItemMobileComponent } from './device-views/swiper-item-mobile/carousel-item-mobile.component';
import { SwiperItemWebComponent } from './device-views/swiper-item-web/swiper-item-web.component';
import { ProductItemModel } from '../../../models/product-item.model';

@Component({
  selector: 'keleman-product-swiper-item',
  standalone: true,
  imports: [CommonModule, CarouselItemMobileComponent, SwiperItemWebComponent],
  templateUrl: './keleman-product-swiper-item.component.html',
  styleUrls: ['./keleman-product-swiper-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class KelemanProductSwiperItemComponent implements OnInit {
  @Input() product!: ProductItemModel;
  constructor(public applicationStateService: ApplicationStateService) {}

  ngOnInit() {
    console.log(this.product);
  }
}
