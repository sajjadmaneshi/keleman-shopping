import { Component } from '@angular/core';
import SwiperCore, { Navigation } from 'swiper';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SrcSet } from '../../../../../../shared/directives/image-responsive.directive';
SwiperCore.use([Navigation]);
@Component({
  selector: 'app-amazing-offer-swiper',
  templateUrl: './amazing-offer-swiper.component.html',
  styleUrls: ['./amazing-offer-swiper.component.scss'],
})
export class AmazingOfferSwiperComponent {
  srcSetText: SrcSet[] = [
    {
      src: 'assets/media/amazing-offer/slider/text/img_sm.png',
      size: Breakpoints.Handset,
      class: 'amazing-offer-text',
    },
    {
      src: 'assets/media/amazing-offer/slider/text/img_lg.png',
      size: Breakpoints.Tablet,
      class: 'amazing-offer-text',
    },
    {
      src: 'assets/media/amazing-offer/slider/text/img_lg.png',
      size: Breakpoints.Web,
      class: 'amazing-offer-text',
    },
  ];
  srcSetBox: SrcSet[] = [
    {
      src: 'assets/media/amazing-offer/slider/image/img_sm.png',
      size: Breakpoints.Handset,
      width: 130,
      height: 96,
    },
    {
      src: 'assets/media/amazing-offer/slider/image/img_lg.png',
      size: Breakpoints.Tablet,
      width: 213,
      height: 157,
    },
    {
      src: 'assets/media/amazing-offer/slider/image/img_lg.png',
      size: Breakpoints.Web,
      width: 213,
      height: 157,
    },
  ];
  constructor(private _responsive: BreakpointObserver) {}
}
