import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { CategorySimpleInfoViewModel } from '../../../products/data/models/view-models/category-simple-info.view-model';
import { CategoryPropertyOptionViewModel } from '../../../products/data/models/view-models/category-property-option.view-model';
import { ProductCategoryRepository } from '../../../products/data/repositories/product-category.repository';

@Component({
  selector: 'keleman-category-about',
  templateUrl: './category-about.component.html',
  styleUrls: ['./category-about.component.scss'],
})
export class CategoryAboutComponent implements OnInit, OnChanges, OnDestroy {
  @Input() categoryId!: number;

  isLoading = true;

  categoryDetails!: CategorySimpleInfoViewModel;
  propertyOptions: CategoryPropertyOptionViewModel[] = [];

  destroy$ = new Subject<void>();

  constructor(
    private _productCategoryRepository: ProductCategoryRepository,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this._getCategoryDetails();
  }

  ngOnChanges(): void {
    this._getCategoryDetails();
  }

  private _getCategoryDetails() {
    if (this.categoryId) {
      this._productCategoryRepository
        .getSingle(this.categoryId)
        .pipe(
          tap(() => (this.isLoading = false)),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (categoryDetails) =>
            (this.categoryDetails = categoryDetails.result!),
          error: () => (this.isLoading = false),
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
