import { Injectable } from '@angular/core';
import { CategoryModel } from '../../../shared/models/category.model';

@Injectable()
export class ProductCategoryService {
  assetsBaseUrl =
    'assets/media/static-resources/categories-without-background/';
  categories: CategoryModel[] = [
    {
      image: `${this.assetsBaseUrl}motor.svg`,
      title: ' موتور آسانسور',
    },
    {
      image: `${this.assetsBaseUrl}rail.svg`,
      title: ' ریل راهنما آسانسور ',
    },
    {
      image: `${this.assetsBaseUrl}door.svg`,
      title: ' درب آسانسور  ',
    },
    {
      image: `${this.assetsBaseUrl}tow-wire.svg`,
      title: ' سیم بکسل و تراول کابل',
    },
    {
      image: `${this.assetsBaseUrl}dashboard.svg`,
      title: ' تابلو فرمان ',
    },
    {
      image: `${this.assetsBaseUrl}door-accessories.svg`,
      title: ' متعلقات درب و ریل',
    },
    {
      image: `${this.assetsBaseUrl}packages.svg`,
      title: ' پکیج های آسانسور ',
    },
    {
      image: `${this.assetsBaseUrl}mechanical-accessories.svg`,
      title: ' متعلقات مکانیکی ',
    },
    {
      image: `${this.assetsBaseUrl}tools.svg`,
      title: ' لوازم یدکی ',
    },
    {
      image: `${this.assetsBaseUrl}appliances.svg`,
      title: ' لوازم برقی ',
    },
    {
      image: `${this.assetsBaseUrl}equipment.svg`,
      title: ' تجهیزات ',
    },
    {
      image: `${this.assetsBaseUrl}startup-accessories.svg`,
      title: ' متعلقات راه اندازی ',
    },
  ];
}
