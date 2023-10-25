import { Component, Input } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';
import { ProductCategoryViewModel } from '../../../../shared/data/models/view-models/product-category.view-model';
import { LazyLoadingDirective } from '../../../../shared/directives/lazy-loading.directive';
import { EmptyImageDirective } from '../../../../shared/directives/empty-image.directive';
import { ENVIRONMENT } from '../../../../../environments/environment';

@Component({
  selector: 'app-product-category-item',
  templateUrl: './product-category-item.component.html',
  standalone: true,
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    LazyLoadingDirective,
    EmptyImageDirective,
  ],
})
export class ProductCategoryItemComponent {
  @Input() category!: ProductCategoryViewModel;
  @Input() isLoading = false;

  downloadUrl = ENVIRONMENT.downloadUrl;

  public imageAddress(address: string) {
    if (address) return address.replace(/^(\.\.\/)+/, '');
    else return '';
  }
}
