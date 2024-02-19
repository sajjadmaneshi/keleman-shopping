import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
} from '@angular/core';
import { ProductCategoryViewModel } from '../../data/models/view-models/product-category.view-model';
import { Subject, takeUntil, tap } from 'rxjs';
import { ProductCategoryService } from './product-category.service';
import { LoadingService } from '../../../../common/services/loading.service';

@Component({
  template: '',
  standalone: true,
})
export class BaseCategoryComponent implements OnChanges, OnDestroy {
  @Input() parentId!: number | null;
  @Output() onItemClick = new EventEmitter<string>();
  categories: ProductCategoryViewModel[] = [];
  destroy$ = new Subject<void>();

  constructor(
    public productCategoryService: ProductCategoryService,
    public loadingService: LoadingService
  ) {}

  getCategoryProducts(url: string) {
    this.onItemClick.emit(url);
  }

  ngOnChanges(): void {
    if (this.parentId) {
      this._getCategories();
    }
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
