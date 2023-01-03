import { Component } from '@angular/core';
import { CategoryModel } from '../../../../shared/models/category.model';

@Component({
  selector: 'keleman-product-category-web',
  templateUrl: './product-category-web.component.html',
  styleUrls: ['./product-category-web.component.scss'],
})
export class ProductCategoryWebComponent {
  slides: CategoryModel[] = [
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
    {
      image: 'assets/media/temp/img.png',
      title: ' موتور گیربکس ',
    },
    {
      image: 'assets/media/temp/img.png',
      title: ' موتور گیربکس ',
    },
    {
      image: 'assets/media/temp/img.png',
      title: ' موتور گیربکس ',
    },
  ];
}
