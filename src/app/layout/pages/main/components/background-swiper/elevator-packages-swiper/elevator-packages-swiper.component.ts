import { Component } from '@angular/core';
import { SrcSet } from '../../../../../../../shared/directives/image-responsive.directive';
import { Breakpoints } from '@angular/cdk/layout';
import { ProductItemModel } from '../../../../../../../shared/models/product-item.model';

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

  slides: ProductItemModel[] = [
    {
      image: 'assets/media/temp/80e39485-22e5-42e9-ad6c-c11486818a75-thumb.jpg',
      name: ' موتور گیربکس الکو',
      price: 25000000,
      off: 10,
      priceWithOff: 4200000,
    },
    {
      image: 'assets/media/temp/80e39485-22e5-42e9-ad6c-c11486818a75-thumb.jpg',
      name: ' موتور گیربکس ',
      price: 350000000,
      off: 15,
      priceWithOff: 3200000,
    },
    {
      image: 'assets/media/temp/80e39485-22e5-42e9-ad6c-c11486818a75-thumb.jpg',
      name: ' موتور گیربکس ',
      price: 350000000,
      off: 10,
      priceWithOff: 50000,
    },
    {
      image: 'assets/media/temp/80e39485-22e5-42e9-ad6c-c11486818a75-thumb.jpg',
      name: ' موتور گیربکس ',
      price: 350000000,
      off: 10,
      priceWithOff: 50000,
    },
    {
      image: 'assets/media/temp/80e39485-22e5-42e9-ad6c-c11486818a75-thumb.jpg',
      name: ' موتور گیربکس ',
      price: 350000000,
      off: 10,
      priceWithOff: 50000,
    },
    {
      image: 'assets/media/temp/80e39485-22e5-42e9-ad6c-c11486818a75-thumb.jpg',
      name: ' موتور گیربکس ',
      price: 350000000,
      off: 10,
      priceWithOff: 50000,
    },
    {
      image: 'assets/media/temp/80e39485-22e5-42e9-ad6c-c11486818a75-thumb.jpg',
      name: ' موتور گیربکس ',
      price: 350000000,
      off: 10,
      priceWithOff: 50000,
    },
  ];
}
