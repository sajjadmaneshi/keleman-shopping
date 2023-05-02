import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductCategoryService } from './product-category.service';
import { CommonModule } from '@angular/common';
import { ProductCategoryItemComponent } from './product-category-item/product-category-item.component';
import {
  SwiperContentDirective,
  SwiperTemplateDirective,
} from '../../../../../shared/directives/swiper-template.directive';
import { SwiperComponent } from '../../../../../shared/components/swiper/swiper.component';

@Component({
  selector: 'keleman-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],

  imports: [
    CommonModule,
    ProductCategoryItemComponent,
    SwiperComponent,
    SwiperContentDirective,
    SwiperTemplateDirective,
  ],
  providers: [ProductCategoryService],
  standalone: true,
})
export class ProductCategoryComponent {
  isLoading = new BehaviorSubject(false);
  constructor(public productCategoryService: ProductCategoryService) {}
}
