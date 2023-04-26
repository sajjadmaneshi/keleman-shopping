import { Component } from '@angular/core';
import { AmazingOfferRepository } from './data/amazing-offer.repository';
import { ProductViewModel } from '../../../../products/data/models/view-models/product.view-model';
import { BehaviorSubject } from 'rxjs';
import { SharedVariablesService } from '../../../../../../shared/services/shared-variables.service';
@Component({
  selector: 'app-amazing-offer-swiper',
  templateUrl: './amazing-offer-swiper.component.html',
  styleUrls: ['./amazing-offer-swiper.component.scss'],
  providers: [AmazingOfferRepository],
})
export class AmazingOfferSwiperComponent {
  isLoading = new BehaviorSubject(false);
  slides: ProductViewModel[] = [
    {
      defaultPic: 'assets/media/temp/1.jpg',
      name: ' موتور گیربکس ',
      price: 350000000,
      rate: { count: 3, average: 2 },
      description: 'test',
      id: 1,
      deliveryDesc: '',
      Introduction: '',
    },
    {
      defaultPic: 'assets/media/temp/1.jpg',
      name: ' موتور گیربکس ',
      price: 350000000,
      rate: { count: 3, average: 2 },
      description: 'test',
      id: 1,
      deliveryDesc: '',
      Introduction: '',
    },
    {
      defaultPic: 'assets/media/temp/1.jpg',
      name: ' موتور گیربکس ',
      price: 350000000,
      rate: { count: 3, average: 2 },
      description: 'test',
      id: 1,
      deliveryDesc: '',
      Introduction: '',
    },
    {
      defaultPic: 'assets/media/temp/1.jpg',
      name: ' موتور گیربکس ',
      price: 350000000,
      rate: { count: 3, average: 2 },
      description: 'test',
      id: 1,
      deliveryDesc: '',
      Introduction: '',
    },
    {
      defaultPic: 'assets/media/temp/1.jpg',
      name: ' موتور گیربکس ',
      price: 350000000,
      rate: { count: 3, average: 2 },
      description: 'test',
      id: 1,
      deliveryDesc: '',
      Introduction: '',
    },
    {
      defaultPic: 'assets/media/temp/1.jpg',
      name: ' موتور گیربکس ',
      price: 350000000,
      rate: { count: 3, average: 2 },
      description: 'test',
      id: 1,
      deliveryDesc: '',
      Introduction: '',
    },
    {
      defaultPic: 'assets/media/temp/1.jpg',
      name: ' موتور گیربکس ',
      price: 350000000,
      rate: { count: 3, average: 2 },
      description: 'test',
      id: 1,
      deliveryDesc: '',
      Introduction: '',
    },
    {
      defaultPic: 'assets/media/temp/1.jpg',
      name: ' موتور گیربکس ',
      price: 350000000,
      rate: { count: 3, average: 2 },
      description: 'test',
      id: 1,
      deliveryDesc: '',
      Introduction: '',
    },
    {
      defaultPic: 'assets/media/temp/1.jpg',
      name: ' موتور گیربکس ',
      price: 350000000,
      rate: { count: 3, average: 2 },
      description: 'test',
      id: 1,
      deliveryDesc: '',
      Introduction: '',
    },
    {
      defaultPic: 'assets/media/temp/1.jpg',
      name: ' موتور گیربکس ',
      price: 350000000,
      rate: { count: 3, average: 2 },
      description: 'test',
      id: 1,
      deliveryDesc: '',
      Introduction: '',
    },
  ];
  constructor(public sahredVariableService: SharedVariablesService) {}
}
