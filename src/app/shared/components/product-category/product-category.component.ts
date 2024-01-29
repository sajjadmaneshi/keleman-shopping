import { Component } from '@angular/core';
import { ProductCategoryService } from './product-category.service';
import { CommonModule } from '@angular/common';
import { ProductCategoryItemComponent } from './product-category-item/product-category-item.component';
import {
  SwiperContentDirective,
  SwiperTemplateDirective,
} from '../../../shared/directives/swiper-template.directive';
import { SwiperComponent } from '../../../shared/components/swiper/swiper.component';

import { LoadingService } from '../../../../common/services/loading.service';
import { InitialAppService } from '../../../shared/services/initial-app.service';
import { BaseCategoryComponent } from './base-category.components';

@Component({
  selector: 'keleman-product-categories',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],

  imports: [
    CommonModule,
    ProductCategoryItemComponent,
    SwiperComponent,
    SwiperContentDirective,
    SwiperTemplateDirective,
  ],
  standalone: true,
})
export class ProductCategoryComponent extends BaseCategoryComponent {
  constructor(
    productCategoryService: ProductCategoryService,
    loadingService: LoadingService,
    private _initialAppService: InitialAppService
  ) {
    super(productCategoryService, loadingService);
    this._initialAppService.productCategories.subscribe((result) => {
      this.categories = result;
    });
  }
}
