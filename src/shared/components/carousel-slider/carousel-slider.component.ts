import {

  Component, Input,

} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule} from "swiper/angular";
import {
  SuggestionSliderItemComponent
} from "../../../app/layout/pages/magazine/components/list/suggestion/suggestion-slider-item/suggestion-slider-item.component";
import {CarouselItemComponent} from "./carousel-item/carousel-item.component";


import SwiperCore, {
  Navigation
} from 'swiper';

import {InlineSVGModule} from "ng-inline-svg-2";


SwiperCore.use([Navigation]);
@Component({
  selector: 'app-carousel-slider',
  standalone: true,
  imports: [CommonModule, SwiperModule, SuggestionSliderItemComponent, CarouselItemComponent, InlineSVGModule],
  templateUrl: './carousel-slider.component.html',
  styleUrls: ['./carousel-slider.component.scss']
})
export class CarouselSliderComponent {

  @Input() moreButtonText!:string;
  @Input() title!:string;


}
