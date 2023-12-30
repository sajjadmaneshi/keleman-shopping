import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
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
import { Subject, takeUntil, tap } from 'rxjs';
import { LoadingService } from '../../../../common/services/loading.service';

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
export class ProductCategoryComponent implements OnChanges, OnDestroy {
  @Input() parentId!: number | null;

  @Output() onItemClick = new EventEmitter<ProductCategoryViewModel>();

  categories: ProductCategoryViewModel[] = [];

  destroy$ = new Subject<void>();

  constructor(
    public productCategoryService: ProductCategoryService,
    public loadingService: LoadingService
  ) {}
  private previousValue: any;
  inputHasChanged: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['parentId']) {
      const currentValue = changes['parentId'].currentValue;
      if (currentValue !== this.previousValue) {
        this.inputHasChanged = true;
        this._getCategories();
      }
      this.previousValue = currentValue;
    }
  }

  getCategoryProducts(category: ProductCategoryViewModel) {
    this.onItemClick.emit(category);
  }

  private _getCategories() {
    this.loadingService.startLoading('read', 'categories');
    this.productCategoryService
      .getCategories(this.parentId!)
      .pipe(
        tap(() => this.loadingService.stopLoading('read', 'categories')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (result) => {
          this.categories = result;
        },
        error: () => this.loadingService.stopLoading('read', 'categories'),
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
