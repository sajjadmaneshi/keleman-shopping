import { Component } from '@angular/core';
import { ProductItemModel } from '../../../../../../shared/models/product-item.model';

@Component({
  selector: 'keleman-elevator-packages-swiper',
  templateUrl: './elevator-packages-swiper.component.html',
  styleUrls: ['./elevator-packages-swiper.component.scss'],
})
export class ElevatorPackagesSwiperComponent {
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
