import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { CategorySimpleInfoViewModel } from '../../../data/models/view-models/category-simple-info.view-model';
import { Subject, takeUntil, tap } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductCategoryRepository } from '../../../data/repositories/product-category.repository';
import { CategoryPropertyOptionViewModel } from '../../../data/models/view-models/category-property-option.view-model';

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
