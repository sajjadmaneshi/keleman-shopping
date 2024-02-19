import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category.component';
import { RouterModule, Routes } from '@angular/router';
import { BreadCrumbComponent } from '../../../shared/components/bread-crumb/bread-crumb.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

import { ProductCategoryItemsComponent } from '../../../shared/components/product-category/product-category-items.component';
import { ProductFiltersModule } from './components/product-filters/product-filters.module';
import { SubCategoriesComponent } from './components/sub-categories/sub-categories.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { InputGroupComponent } from '../../../shared/components/input-group/input-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ProductsSortComponent } from './components/products-sort/products-sort.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { TextWithIconComponent } from '../../../shared/components/text-with-icon/text-with-icon.component';
import { LazyLoadingDirective } from '../../../shared/directives/lazy-loading.directive';
import { EmptyImageDirective } from '../../../shared/directives/empty-image.directive';
import { PriceComponent } from '../../../shared/components/price/price.component';
import { CategoryAboutComponent } from './components/category-about/category-about.component';
import { CanonicalResolver } from '../../../../common/resolvers/canonical.resolver';
import { ProductFilterService } from '../products/services/product-filter.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: `:catUrl1`,
        component: ProductCategoryComponent,
        resolve: {
          canonical: () => inject(CanonicalResolver).resolve(),
        },
      },
      {
        path: ``,
        component: ProductCategoryComponent,
        resolve: {
          canonical: () => inject(CanonicalResolver).resolve(),
        },
      },
    ],
  },
];
@NgModule({
  declarations: [
    ProductCategoryComponent,
    ProductSearchComponent,
    ProductsSortComponent,
    ProductItemComponent,
    CategoryAboutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BreadCrumbComponent,
    NgxSkeletonLoaderModule,
    PaginationComponent,
    ProductFiltersModule,
    SubCategoriesComponent,
    ProductCategoryItemsComponent,
    InputGroupComponent,
    ReactiveFormsModule,
    MatIconModule,
    TextWithIconComponent,
    LazyLoadingDirective,
    EmptyImageDirective,
    PriceComponent,
  ],
  providers: [ProductFilterService],
})
export class ProductCategoryModule {}
