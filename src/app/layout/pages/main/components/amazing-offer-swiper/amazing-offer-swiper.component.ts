import { Component } from '@angular/core';
import SwiperCore, {Navigation} from "swiper";
import {BreakpointObserver} from "@angular/cdk/layout";
SwiperCore.use([Navigation]);
@Component({
  selector: 'app-amazing-offer-swiper',
  templateUrl: './amazing-offer-swiper.component.html',
  styleUrls: ['./amazing-offer-swiper.component.scss']
})
export class AmazingOfferSwiperComponent {
constructor(private _responsive:BreakpointObserver) {
}


}
