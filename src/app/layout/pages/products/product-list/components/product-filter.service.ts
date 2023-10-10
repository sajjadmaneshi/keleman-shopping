import { ApplicationRef, Injectable, OnDestroy } from '@angular/core';
import { SelectedFilterModel } from './product-filters/data/selected-filter.model';
import { ProductCategoryRepository } from '../../data/repositories/product-category.repository';
import {
  CategoryPropertyOptionViewModel,
  OptionViewModel,
  SelectableOption,
  SelectablePropertyModel,
} from '../../data/models/view-models/category-property-option.view-model';
import { BehaviorSubject, map, Subject, take, takeUntil, tap } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QueryParamGeneratorService } from '../../../../../shared/services/query-params-generator.service';
import { RouteHandlerService } from '../../../../../shared/services/route-handler/route-handler.service';
import { PriceRange } from './product-filters/components/product-price-filter/product-price-filter.component';

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
    private _routeHandlerService: RouteHandlerService,
    private _queryParamsService: QueryParamGeneratorService
  ) {
    this.queryParams = { ...this._routeHandlerService.getQueryParamsSnapShot };
  }

  public getCategoryFilterPropertyOptions(categoryId: number) {
    this.filterList = new SelectedFilterModel();
    this.isLoading.next(true);
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
    return properties.map((property: CategoryPropertyOptionViewModel) => {
      const { title, seoTitle, options } = property;
      return new SelectableOption(
        title,
        seoTitle,
        options.map(
          (option) =>
            new SelectablePropertyModel({ title, seoTitle }, option.title)
        )
      );
    });
  }

  private _updateQueryParam(selectedItem: SelectablePropertyModel): void {
    this.queryParams[
      selectedItem.option.seoTitle ?? selectedItem.option.title
    ] = selectedItem.title;
    this.navigateWithNewParams();
  }
  private _removeQueryParam(selectedItem: SelectablePropertyModel) {
    delete this.queryParams[
      selectedItem.option.seoTitle ?? selectedItem.option.title
    ];

    this.navigateWithNewParams();
  }

  public navigateWithNewParams() {
    this._routeHandlerService.updateQueryParams(
      this._queryParamsService.sortQuryParams(this.queryParams)
    );
  }

  determineSelectedArray(propertyOption: SelectableOption) {
    const value =
      this.queryParams[propertyOption.seoTitle ?? propertyOption.title];
    const index = this._indexOfProperty(value, propertyOption.options);
    if (index != -1) {
      const filterItem = propertyOption.options[index];
      filterItem.selected = true;
      this.filterList.filters.push(filterItem);
    }
  }

  private _indexOfProperty(
    param: string,
    properties: SelectablePropertyModel[]
  ) {
    return properties.findIndex((property) => property.title === param);
  }

  manageSelectedArray(selectedItem: SelectablePropertyModel): void {
    this.filterList.filters = this.filterList.filters.filter(
      (x) =>
        (x.option.seoTitle ? x.option.seoTitle : x.option.title) !=
        (selectedItem.option.seoTitle
          ? selectedItem.option.seoTitle
          : selectedItem.option.title)
    );

    if (selectedItem.selected) {
      this.filterList.filters.push(selectedItem);
      this._updateQueryParam(selectedItem);
    } else {
      this._removeQueryParam(selectedItem);
    }
  }

  addPriceFilter(priceRange: PriceRange) {
    this.filterList.price = priceRange;
    const newQueryParams = {
      ...this.queryParams,
      priceFrom: priceRange.min,
      priceTo: priceRange.max,
    };
    this.queryParams = this._queryParamsService.sortQuryParams(newQueryParams);
    this.navigateWithNewParams();
  }
  removePriceFilter() {
    console.log(this.queryParams);
    this.filterList.price = undefined;
    this.resetPrice();
    delete this.queryParams['priceFrom'];
    delete this.queryParams['priceTo'];

    this.navigateWithNewParams();
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
  }

  removeAll() {
    this.filterList.filters.forEach((item: SelectablePropertyModel) => {
      item.selected = false;
    });
    this.filterList = new SelectedFilterModel();
    this.queryParams = { p: '0' };
    this.navigateWithNewParams();
    this.resetPrice();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
