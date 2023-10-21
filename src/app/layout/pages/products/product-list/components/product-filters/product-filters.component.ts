import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { ProductFilterService } from '../../../services/product-filter.service';
import { PriceRange } from './components/product-price-filter/product-price-filter.component';
import {
  CategoryPropertyOptionViewModel,
  SelectableOption,
  SelectablePropertyModel,
} from '../../../data/models/view-models/category-property-option.view-model';
import { BehaviorSubject, Subject, takeLast, takeUntil } from 'rxjs';
import { ProductCategoryViewModel } from '../../../../../../shared/data/models/view-models/product-category.view-model';
import { ActivatedRoute, Params } from '@angular/router';
import { SelectedFilterModel } from './data/selected-filter.model';
import { RouteHandlerService } from '../../../../../../shared/services/route-handler/route-handler.service';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'keleman-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
})
export class ProductFiltersComponent implements OnChanges, OnDestroy {
  @Input() categoryId!: number;
  @Input() maxPrice!: number;
  destroy$ = new Subject<void>();
  private previousValue: any;
  inputHasChanged: boolean = false;

  constructor(
    public productFilterService: ProductFilterService,
    public applicationStateService: ApplicationStateService,
    private _bottomSheet: MatBottomSheet,
    private _routeHandler: RouteHandlerService
  ) {
    this._routeHandler
      .getQueryParams()
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        if (params['instock']) {
          this.productFilterService.inStock = true;
          this.changeOutOfStock();
        } else this.productFilterService.inStock = false;
      });
  }

  changeOutOfStock() {
    const selectedModel = new SelectedFilterModel(
      'instock',
      'فقط موجود',
      (+this.productFilterService.inStock).toString()
    );
    this.productFilterService.inStock
      ? this.productFilterService.addToFilterList(selectedModel)
      : this.productFilterService.removeFromFilterList(selectedModel.key);
  }

  tranckByFn(index: number, item: SelectableOption) {
    return item.title;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoryId']) {
      const currentValue = changes['categoryId'].currentValue;
      if (currentValue !== this.previousValue) {
        this.inputHasChanged = true;
        this.productFilterService.getCategoryFilterPropertyOptions(
          this.categoryId
        );
      }
      this.previousValue = currentValue;
    }
  }

  openBottomSheet(element: TemplateRef<any>) {
    this._bottomSheet.open(element);
  }

  closeBottomSheet() {
    this._bottomSheet.dismiss();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
