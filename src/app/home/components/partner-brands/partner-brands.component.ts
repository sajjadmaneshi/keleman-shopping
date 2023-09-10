import { Component } from '@angular/core';
import SwiperCore, { Autoplay } from 'swiper';
import { SharedVariablesService } from '../../../shared/services/shared-variables.service';

SwiperCore.use([Autoplay]);
@Component({
  selector: 'keleman-partner-brands',
  templateUrl: './partner-brands.component.html',
  styleUrls: ['./partner-brands.component.scss'],
})
export class PartnerBrandsComponent {
  isLoading = false;
  slides: string[] = [
    'assets/media/static-resources/partner-brands/behranlift.png',
    'assets/media/static-resources/partner-brands/yaran.png',
    'assets/media/static-resources/partner-brands/behranlift.png',
    'assets/media/static-resources/partner-brands/yaran.png',
    'assets/media/static-resources/partner-brands/behranlift.png',
    'assets/media/static-resources/partner-brands/yaran.png',
    'assets/media/static-resources/partner-brands/behranlift.png',
    'assets/media/static-resources/partner-brands/yaran.png',
  ];
  constructor(public sharedVariableService: SharedVariablesService) {}
}
