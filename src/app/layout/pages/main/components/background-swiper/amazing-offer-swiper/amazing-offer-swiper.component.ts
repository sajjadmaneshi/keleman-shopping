import { Component } from '@angular/core';
import SwiperCore, { Navigation } from 'swiper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ProductItemModel } from '../../../../../../shared/models/product-item.model';
SwiperCore.use([Navigation]);
@Component({
  selector: 'app-amazing-offer-swiper',
  templateUrl: './amazing-offer-swiper.component.html',
  styleUrls: ['./amazing-offer-swiper.component.scss'],
})
export class AmazingOfferSwiperComponent {
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
  constructor(private _responsive: BreakpointObserver) {}
}
