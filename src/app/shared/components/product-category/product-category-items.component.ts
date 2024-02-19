import { Component, OnDestroy } from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'keleman-product-category-items',
  templateUrl: './product-category-items.component.html',
  styleUrls: ['./product-category-items.component.scss'],

  imports: [
    CommonModule,
    ProductCategoryItemComponent,
    SwiperComponent,
    SwiperContentDirective,
    SwiperTemplateDirective,
  ],
  standalone: true,
})
export class ProductCategoryItemsComponent
  extends BaseCategoryComponent
  implements OnDestroy
{
  constructor(
    productCategoryService: ProductCategoryService,
    loadingService: LoadingService,
    private _initialAppService: InitialAppService
  ) {
    super(productCategoryService, loadingService);
    this._initialAppService.productCategories
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.categories = result;
      });
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
