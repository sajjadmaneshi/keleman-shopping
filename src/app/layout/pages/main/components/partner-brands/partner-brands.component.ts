import { Component } from '@angular/core';
import SwiperCore, { Autoplay } from 'swiper';

SwiperCore.use([Autoplay]);
@Component({
  selector: 'keleman-partner-brands',
  templateUrl: './partner-brands.component.html',
  styleUrls: ['./partner-brands.component.scss'],
})
export class PartnerBrandsComponent {
  slides: string[] = [
    'assets/media/static-resources/partner-brands/behranlift.png',
    'assets/media/static-resources/partner-brands/yaran.png',
    'assets/media/logo/keleman-logo.png',
    'assets/media/static-resources/partner-brands/behranlift.png',
    'assets/media/static-resources/partner-brands/yaran.png',
    'assets/media/logo/keleman-logo.png',
    'assets/media/static-resources/partner-brands/behranlift.png',
    'assets/media/static-resources/partner-brands/yaran.png',
    'assets/media/logo/keleman-logo.png',
    'assets/media/static-resources/partner-brands/behranlift.png',
    'assets/media/static-resources/partner-brands/yaran.png',
    'assets/media/logo/keleman-logo.png',
  ];
  constructor() {}
}
