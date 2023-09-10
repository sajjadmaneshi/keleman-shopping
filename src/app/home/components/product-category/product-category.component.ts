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
  selector: 'keleman-product-category',
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
export class ProductCategoryComponent implements OnChanges, OnInit {
  @Input() parentId: number = 0;

  @Output() onItemClick = new EventEmitter<ProductCategoryViewModel>();

  categories: ProductCategoryViewModel[] = [];

  constructor(
    public productCategoryService: ProductCategoryService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._getCategories();
  }

  tranckByFn(index: number, item: ProductCategoryViewModel) {
    return item.id;
  }

  getCategoryProducts(category: ProductCategoryViewModel) {
    this.onItemClick.emit(category);
  }

  private _getCategories() {
    this.productCategoryService.getCategories(this.parentId).then((result) => {
      this.categories = [...result];
      this._cdr.markForCheck();
    });
  }
}
