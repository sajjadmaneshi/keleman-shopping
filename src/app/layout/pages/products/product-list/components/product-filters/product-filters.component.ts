import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { ProductFilterService } from '../../../services/product-filter.service';

import { Subject, takeUntil } from 'rxjs';
import { SelectedFilterModel } from './data/selected-filter.model';
import { RouteHandlerService } from '../../../../../../shared/services/route-handler/route-handler.service';
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LoadingService } from '../../../../../../../common/services/loading.service';

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
    public readonly productFilterService: ProductFilterService,
    public readonly applicationStateService: ApplicationStateService,
    public readonly loadingService: LoadingService,
    private readonly _bottomSheet: MatBottomSheet,
    private readonly _routeHandler: RouteHandlerService
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
