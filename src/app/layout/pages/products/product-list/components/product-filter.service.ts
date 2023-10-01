import { ApplicationRef, Injectable, OnDestroy } from '@angular/core';
import { SelectedFilterModel } from './product-filters/data/selected-filter.model';
import { ProductCategoryRepository } from '../../data/repositories/product-category.repository';
import {
  CategoryPropertyOptionViewModel,
  SelectableOption,
  SelectablePropertyModel,
} from '../../data/models/view-models/category-property-option.view-model';
import { BehaviorSubject, map, Subject, take, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QueryParamGeneratorService } from '../../../../../shared/services/query-params-generator.service';

@Injectable()
export class ProductFilterService implements OnDestroy {
  isLoading = new BehaviorSubject(true);
  filterList = new SelectedFilterModel();

  priceSliderReset = false;

  destroy$ = new Subject<void>();

  propertyOptions: SelectableOption[] = [];

  queryParams!: Params;

  constructor(
    private _cr: ApplicationRef,
    private _productCategoryRepository: ProductCategoryRepository,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _queryParamsService: QueryParamGeneratorService
  ) {
    this._activatedRoute.queryParams.subscribe((res) => {
      this.queryParams = { ...res };
    });
  }

  public getCategoryFilterPropertyOptions(categoryId: number) {
    this._productCategoryRepository
      .getCategoryOptions(categoryId)
      .pipe(
        takeUntil(this.destroy$),
        map((response) => response.result!)
      )
      .subscribe((properties) => {
        this.isLoading.next(false);
        this.propertyOptions = [...this._manipulatePropertyOptions(properties)];
      });
  }

  private _manipulatePropertyOptions(
    properties: CategoryPropertyOptionViewModel[]
  ) {
    return properties.map(
      (property: CategoryPropertyOptionViewModel) =>
        new SelectableOption(
          property.title,
          property.options.map(
            (option) =>
              new SelectablePropertyModel(property.title, option.title)
          )
        )
    );
  }

  private updateQueryParam(selectedItem: SelectablePropertyModel): void {
    if (!this.queryParams[selectedItem.option])
      this.queryParams[selectedItem.option] = [];
    this.queryParams[selectedItem.option].push(selectedItem.title);
    this.navigateWithNewParams();
  }

  private removeQueryParam(selectedItem: SelectablePropertyModel): void {
    // Check if the key exists and is an array
    if (this.queryParams[selectedItem.option] instanceof Array) {
      // Remove the selected item's title from the array
      this.queryParams[selectedItem.option] = this.queryParams[
        selectedItem.option
      ].filter((value: string) => value !== selectedItem.title);

      // Remove the key if the array becomes empty
      if (this.queryParams[selectedItem.option].length === 0) {
        delete this.queryParams[selectedItem.option];
      }
    } else {
      delete this.queryParams[selectedItem.option];
    }
    this.navigateWithNewParams();
  }

  public navigateWithNewParams() {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: this._queryParamsService.sortQuryParams(this.queryParams),
      onSameUrlNavigation: 'reload',
    });
  }

  determineSelectedArray(
    queryParams: Params,
    properties: SelectablePropertyModel[],
    optionTitle: string
  ) {
    for (const key in queryParams) {
      if (key === 'p') continue;
      const value = queryParams[key];
      const paramValues = Array.isArray(value) ? value : [value];
      paramValues.forEach((paramVal: any) => {
        const index = this._indexOfProperty(paramVal, properties);
        if (index != -1) {
          const filterItem = properties[index];
          filterItem.selected = true;
          if (!this._isInFilterList(filterItem.title))
            this.filterList.filters.push(filterItem);
        }
      });
    }
  }

  private _isInFilterList(title: string) {
    return this.filterList.filters.findIndex((x) => x.title === title) != -1;
  }

  private _indexOfProperty(
    param: string,
    properties: SelectablePropertyModel[]
  ) {
    return properties.findIndex((property) => property.title === param);
  }

  manageSelectedArray(selectedItem: SelectablePropertyModel): void {
    const index = this.filterList.filters.findIndex(
      (selected) => selected.title === selectedItem.title
    );
    if (selectedItem.selected) {
      if (index === -1) {
        this.filterList.filters.push(selectedItem);
      }
      this.updateQueryParam(selectedItem);
    } else {
      if (index !== -1) {
        this.filterList.filters.splice(index, 1);
      }
      this.removeQueryParam(selectedItem);
    }
  }
  get canRemoveAll() {
    return (
      this.filterList.outOfStock ||
      this.filterList?.filters?.length > 0 ||
      this.filterList.price
    );
  }

  resetPrice() {
    this.priceSliderReset = true;
    this._cr.tick();
  }

  removeAll() {
    this.filterList.filters.forEach((item: SelectablePropertyModel) => {
      item.selected = false;
      this.removeQueryParam(item);
    });
    this.filterList = new SelectedFilterModel();
    this.resetPrice();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
