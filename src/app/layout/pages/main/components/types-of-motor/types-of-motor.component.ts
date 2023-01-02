import { Component } from '@angular/core';
import { ProductItemModel } from '../../../../../../shared/models/product-item.model';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';

@Component({
  selector: 'keleman-types-of-motor',
  templateUrl: './types-of-motor.component.html',
  styleUrls: ['./types-of-motor.component.scss'],
})
export class TypesOfMotorComponent {
  constructor(public applicationState: ApplicationStateService) {}
  slides: ProductItemModel[] = [
    {
      image: 'assets/media/temp/img.png',
      name: ' موتور گیربکس الکو',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,\n' +
        '        aspernatur blanditiis excepturi harum ipsa labore magni minus molestiae\n' +
        '        nisi omnis porro possimus quas quod recusandae sed suscipit totam vero.\n' +
        '        Esse',
      price: 25000000,
    },
    {
      image: 'assets/media/temp/img.png',
      name: ' موتور گیربکس ',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,\n' +
        '        aspernatur blanditiis excepturi harum ipsa labore magni minus molestiae\n' +
        '        nisi omnis porro possimus quas quod recusandae sed suscipit totam vero.\n' +
        '        Esse',
      price: 350000000,
    },
    {
      image: 'assets/media/temp/img.png',
      name: ' موتور گیربکس ',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,\n' +
        '        aspernatur blanditiis excepturi harum ipsa labore magni minus molestiae\n' +
        '        nisi omnis porro possimus quas quod recusandae sed suscipit totam vero.\n' +
        '        Esse',
      price: 350000000,
    },
    {
      image: 'assets/media/temp/img.png',
      name: ' موتور گیربکس ',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,\n' +
        '        aspernatur blanditiis excepturi harum ipsa labore magni minus molestiae\n' +
        '        nisi omnis porro possimus quas quod recusandae sed suscipit totam vero.\n' +
        '        Esse',
      price: 350000000,
    },
    {
      image: 'assets/media/temp/img.png',
      name: ' موتور گیربکس ',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,\n' +
        '        aspernatur blanditiis excepturi harum ipsa labore magni minus molestiae\n' +
        '        nisi omnis porro possimus quas quod recusandae sed suscipit totam vero.\n' +
        '        Esse',
      price: 350000000,
    },
    {
      image: 'assets/media/temp/img.png',
      name: ' موتور گیربکس ',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,\n' +
        '        aspernatur blanditiis excepturi harum ipsa labore magni minus molestiae\n' +
        '        nisi omnis porro possimus quas quod recusandae sed suscipit totam vero.\n' +
        '        Esse',
      price: 350000000,
    },
    {
      image: 'assets/media/temp/img.png',
      name: ' موتور گیربکس ',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,\n' +
        '        aspernatur blanditiis excepturi harum ipsa labore magni minus molestiae\n' +
        '        nisi omnis porro possimus quas quod recusandae sed suscipit totam vero.\n' +
        '        Esse',
      price: 350000000,
    },
    {
      image: 'assets/media/temp/img.png',
      name: ' موتور گیربکس ',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,\n' +
        '        aspernatur blanditiis excepturi harum ipsa labore magni minus molestiae\n' +
        '        nisi omnis porro possimus quas quod recusandae sed suscipit totam vero.\n' +
        '        Esse',
      price: 350000000,
    },
    {
      image: 'assets/media/temp/img.png',
      name: ' موتور گیربکس ',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,\n' +
        '        aspernatur blanditiis excepturi harum ipsa labore magni minus molestiae\n' +
        '        nisi omnis porro possimus quas quod recusandae sed suscipit totam vero.\n' +
        '        Esse',
      price: 350000000,
    },
  ];
}
