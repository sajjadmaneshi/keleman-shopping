import { Component } from '@angular/core';
import { CategoryModel } from '../../../../shared/models/category.model';

@Component({
  selector: 'keleman-product-category-mobile',
  templateUrl: './product-category-mobile.component.html',
  styleUrls: ['./product-category-mobile.component.scss'],
})
export class ProductCategoryMobileComponent {
  categories: CategoryModel[] = [
    {
      image: 'assets/media/temp/img.png',
      title: ' موتور آسانسور',
    },
    {
      image: 'assets/media/temp/img.png',
      title: ' ریل راهنما آسانسور ',
    },
    {
      image: 'assets/media/temp/img.png',
      title: ' درب آسانسور  ',
    },
    {
      image: 'assets/media/temp/img.png',
      title: ' سیم بکسل و تراول کابل',
    },
    {
      image: 'assets/media/temp/img.png',
      title: ' تابلو فرمان ',
    },
    {
      image: 'assets/media/temp/img.png',
      title: ' متعلقات ',
    },
    {
      image: 'assets/media/temp/img.png',
      title: ' موتور گیربکس ',
    },
  ];
}
