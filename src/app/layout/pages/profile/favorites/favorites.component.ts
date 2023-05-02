import { Component } from '@angular/core';
import { ProductViewModel } from '../../products/data/models/view-models/product.view-model';

@Component({
  selector: 'keleman-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  favoriteItems: ProductViewModel[] = [
    {
      defaultPic: 'assets/media/temp/1.jpg',
      name: ' موتور گیربکس ',
      price: 350000000,
      rate: { count: 3, average: 2 },
      description:
        'با پیشرفت صنعت، شرکت های ایران تمام تلاش خودرا کرده اند که کیفیت های کالاهای خود را هم سطح تولیدات اروپایی کنند از این رو شرکت  sky اقدام به تولید موتوری با کیفیت و با دو قدرت 1/6و 3/7 کیلووات کرده است.\n' +
        '\n' +
        'لازم به ذکر است دنده ماردون این موتور تولید شده در کشور ترکیه می باشد و به صورت کلی طراحی و تولید موتور در ایران انجام می شود از مزایای این موتور می توان به کوپل شدن اینکدر فابریک و استاتیک لود بالا اشاره کرد.',
      id: 1,
      deliveryDesc: '',
      Introduction: '',
    },
    {
      defaultPic: 'assets/media/temp/1.jpg',
      name: ' موتور گیربکس ',
      price: 350000000,
      rate: { count: 3, average: 2 },
      description:
        'با پیشرفت صنعت، شرکت های ایران تمام تلاش خودرا کرده اند که کیفیت های کالاهای خود را هم سطح تولیدات اروپایی کنند از این رو شرکت  sky اقدام به تولید موتوری با کیفیت و با دو قدرت 1/6و 3/7 کیلووات کرده است.\n' +
        '\n' +
        'لازم به ذکر است دنده ماردون این موتور تولید شده در کشور ترکیه می باشد و به صورت کلی طراحی و تولید موتور در ایران انجام می شود از مزایای این موتور می توان به کوپل شدن اینکدر فابریک و استاتیک لود بالا اشاره کرد.',
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
      description:
        'با پیشرفت صنعت، شرکت های ایران تمام تلاش خودرا کرده اند که کیفیت های کالاهای خود را هم سطح تولیدات اروپایی کنند از این رو شرکت  sky اقدام به تولید موتوری با کیفیت و با دو قدرت 1/6و 3/7 کیلووات کرده است.\n' +
        '\n' +
        'لازم به ذکر است دنده ماردون این موتور تولید شده در کشور ترکیه می باشد و به صورت کلی طراحی و تولید موتور در ایران انجام می شود از مزایای این موتور می توان به کوپل شدن اینکدر فابریک و استاتیک لود بالا اشاره کرد.',
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
