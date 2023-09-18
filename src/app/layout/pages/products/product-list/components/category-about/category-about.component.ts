import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ProductRepository } from '../../../data/repositories/product.repository';
import { CategorySimpleInfoViewModel } from '../../../data/models/view-models/category-simple-info.view-model';
import { Subject, takeUntil, tap } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'keleman-category-about',
  templateUrl: './category-about.component.html',
  styleUrls: ['./category-about.component.scss'],
})
export class CategoryAboutComponent implements OnInit, OnChanges, OnDestroy {
  @Input() categoryId!: number;

  isLoading = false;

  categoryDetails!: CategorySimpleInfoViewModel | null;
  destroy$ = new Subject<void>();

  constructor(private _productRepository: ProductRepository,public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this._getCategoryDetails();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._getCategoryDetails();
  }

  private _getCategoryDetails() {
    if (this.categoryId) {
      this._productRepository
        .getSingle(this.categoryId)
        .pipe(
          tap(() => (this.isLoading = false)),
          takeUntil(this.destroy$)
        )
        .subscribe((result) => {
          this.categoryDetails = result.result!;
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
