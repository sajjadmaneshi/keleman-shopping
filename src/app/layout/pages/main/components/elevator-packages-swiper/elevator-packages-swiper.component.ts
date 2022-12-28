import { Component } from '@angular/core';
import { SrcSet } from '../../../../../../shared/directives/image-responsive.directive';
import { Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-elevator-packages-swiper',
  templateUrl: './elevator-packages-swiper.component.html',
  styleUrls: ['./elevator-packages-swiper.component.scss'],
})
export class ElevatorPackagesSwiperComponent {
  srcSetText: SrcSet[] = [
    {
      src: 'assets/media/elevator-packages/slider/text/img_sm.png',
      size: Breakpoints.Handset,
      width: 105,
      height: 75,
    },
    {
      src: 'assets/media/elevator-packages/slider/text/img_lg.png',
      size: Breakpoints.Tablet,
      width: 185,
      height: 85,
    },
    {
      src: 'assets/media/elevator-packages/slider/text/img_lg.png',
      size: Breakpoints.Web,
      width: 185,
      height: 85,
    },
  ];
  srcSetBox: SrcSet[] = [
    {
      src: 'assets/media/elevator-packages/slider/image/img_sm.png',
      size: Breakpoints.Handset,
      width: 178,
      height: 178,
    },
    {
      src: 'assets/media/elevator-packages/slider/image/img_lg.png',
      size: Breakpoints.Tablet,
      width: 228,
      height: 229,
    },
    {
      src: 'assets/media/elevator-packages/slider/image/img_lg.png',
      size: Breakpoints.Web,
      width: 228,
      height: 229,
    },
  ];
}
