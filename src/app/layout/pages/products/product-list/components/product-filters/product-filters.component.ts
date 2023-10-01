import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { ProductFilterService } from '../product-filter.service';
import { PriceRange } from './components/product-price-filter/product-price-filter.component';
import {
  CategoryPropertyOptionViewModel,
  SelectableOption,
  SelectablePropertyModel,
} from '../../../data/models/view-models/category-property-option.view-model';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ProductCategoryViewModel } from '../../../../../../shared/data/models/view-models/product-category.view-model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'keleman-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFiltersComponent implements OnChanges {
  @Input() categoryId!: number;
  isLoading = new BehaviorSubject(true);

  destroy$ = new Subject<void>();
  constructor(
    public productFilterService: ProductFilterService,
    private _cdr: ChangeDetectorRef
  ) {}

  changeOutOfStock(checked: boolean) {
    this.productFilterService.filterList.outOfStock = checked;
  }
  onChangePrice(priceRange: PriceRange) {
    this.productFilterService.filterList.price = priceRange;
  }

  tranckByFn(index: number, item: SelectableOption) {
    return item.title;
  }

  ngOnChanges(): void {
    if (this.categoryId) {
      this.productFilterService.getCategoryFilterPropertyOptions(
        this.categoryId
      );
    }
  }
}
