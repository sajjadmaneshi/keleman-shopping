import { AfterViewInit, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductViewModel } from '../background-swiper/amazing-offer-swiper/data/models/product.view-model';
import Swiper, { EffectCreative, Navigation } from 'swiper';
import SwiperCore from 'swiper';

SwiperCore.use([EffectCreative, Navigation]);
@Component({
  selector: 'keleman-package-swiper',
  templateUrl: './package-swiper.component.html',
  styleUrls: ['./package-swiper.component.scss'],
})
export class PackageSwiperComponent implements AfterViewInit {
  isLoading = new BehaviorSubject(false);
  slides: ProductViewModel[] = [];
  swiper: any;
  constructor() {}

  ngAfterViewInit(): void {
    this.swiper = new Swiper('.mySwiper2', {
      slidesPerView: 'auto',
      grabCursor: true,
      effect: 'creative',
    });
  }
}
