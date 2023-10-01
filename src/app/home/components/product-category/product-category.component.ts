import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProductCategoryService } from './product-category.service';
import { CommonModule } from '@angular/common';
import { ProductCategoryItemComponent } from './product-category-item/product-category-item.component';
import {
  SwiperContentDirective,
  SwiperTemplateDirective,
} from '../../../shared/directives/swiper-template.directive';
import { SwiperComponent } from '../../../shared/components/swiper/swiper.component';
import { ProductCategoryViewModel } from '../../../shared/data/models/view-models/product-category.view-model';

@Component({
  selector: 'keleman-product-categories',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ProductCategoryItemComponent,
    SwiperComponent,
    SwiperContentDirective,
    SwiperTemplateDirective,
  ],
  standalone: true,
})
export class ProductCategoryComponent implements OnChanges {
  @Input() parentId: number | null = null;

  @Output() onItemClick = new EventEmitter<ProductCategoryViewModel>();

  categories: ProductCategoryViewModel[] = [];

  constructor(
    public productCategoryService: ProductCategoryService,
    private _cdr: ChangeDetectorRef
  ) {
    this._getCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentId'].previousValue != changes['parentId'].currentValue)
      this._getCategories();
  }

  tranckByFn(index: number, item: ProductCategoryViewModel) {
    return item.id;
  }

  getCategoryProducts(category: ProductCategoryViewModel) {
    this.onItemClick.emit(category);
  }

  private _getCategories() {
    this.productCategoryService
      .getCategories(this.parentId!)
      .subscribe((result) => {
        this.categories = [...result];
        this._cdr.markForCheck();
      });
  }
}
