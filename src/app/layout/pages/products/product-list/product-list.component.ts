import { Component } from '@angular/core';
import { ProductRepository } from '../data/repositories/product.repository';
import { ProductViewModel } from '../data/models/view-models/product.view-model';
import { Subscription } from 'rxjs';
import { AppErrorHandler } from '../../../../shared/common/app-error-handler';
import { AppErrors } from '../../../../shared/common/app-errors';

@Component({
  selector: 'keleman-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ProductRepository],
})
export class ProductListComponent {
  products: ProductViewModel[] = [];

  subscription = new Subscription();
  constructor(private _repository: ProductRepository) {
    this.products = [
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
  }
  throttle = 500;
  scrollDistance = 1;

  onScrollDown() {
    this.products.push(
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
      }
    );
  }
}
