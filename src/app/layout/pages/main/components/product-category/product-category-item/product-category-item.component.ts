import { Component, Input } from '@angular/core';
import { CategoryModel } from '../../../../../../shared/models/category.model';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-category-item',
  templateUrl: './product-category-item.component.html',
  standalone: true,
  imports: [CommonModule, NgxSkeletonLoaderModule],
})
export class ProductCategoryItemComponent {
  @Input() category!: CategoryModel;
  @Input() isLoading = false;
}
