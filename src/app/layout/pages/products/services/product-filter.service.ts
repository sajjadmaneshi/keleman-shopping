import { Injectable, OnDestroy } from '@angular/core';
import { SelectedFilterModel } from '../product-list/components/product-filters/data/selected-filter.model';
import { ProductCategoryRepository } from '../data/repositories/product-category.repository';
import {
  CategoryPropertyOptionViewModel,
  SelectableOption,
  SelectablePropertyModel,
} from '../data/models/view-models/category-property-option.view-model';
import { BehaviorSubject, map, Subject, takeUntil, tap } from 'rxjs';
import { Params } from '@angular/router';
import { QueryParamGeneratorService } from '../../../../shared/services/query-params-generator.service';
import { RouteHandlerService } from '../../../../shared/services/route-handler/route-handler.service';
import { PriceRange } from '../product-list/components/product-filters/components/product-price-filter/product-price-filter.component';
import { ProductSortTypeEnum } from '../data/enums/product-sort-type .enum';
import { HttpClientResult } from '../../../../shared/data/models/http/http-client.result';
import { LoadingService } from '../../../../../common/services/loading.service';

@Injectable()
export class ProductFilterService implements OnDestroy {
  maxPrice = new BehaviorSubject<number>(0);
  filterList!: SelectedFilterModel[];
  priceSliderReset = false;
  destroy$ = new Subject<void>();
  propertyOptions: SelectableOption[] = [];
  queryParams!: Params;
  inStock = false;
  i = 0;

  resetFilter$ = new Subject<void>();
  sortItems = [
    { title: 'پیش فرض', value: ProductSortTypeEnum.NA },
    { title: 'پرفروش ترین', value: ProductSortTypeEnum.TopSelling },
    { title: 'تخفیف دار', value: ProductSortTypeEnum.Discounted },
    { title: 'ارزان ترین', value: ProductSortTypeEnum.LowPrice },
    { title: 'گرانترین', value: ProductSortTypeEnum.HighPrice },
  ];

  constructor(
    private _productCategoryRepository: ProductCategoryRepository,
    private _routeHandlerService: RouteHandlerService,
    private _queryParamsService: QueryParamGeneratorService,
    private _loadingService: LoadingService
  ) {
    this.filterList = this._initNewFilterList();
    this._routeHandlerService
      .getQueryParams()
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.queryParams = params;
      });
  }

  private _initNewFilterList() {
    return [new SelectedFilterModel('p', '', '0')];
  }

  public getCategoryFilterPropertyOptions(categoryId: number) {
    this._loadingService.startLoading('read', 'categoryFilterPropertyOptions');
    this._productCategoryRepository
      .getCategoryOptions(categoryId)
      .pipe(
        tap(() =>
          this._loadingService.stopLoading(
            'read',
            'categoryFilterPropertyOptions'
          )
        ),
        takeUntil(this.destroy$),
        map(
          (response: HttpClientResult<CategoryPropertyOptionViewModel[]>) =>
            response.result!
        )
      )
      .subscribe({
        next: (properties: CategoryPropertyOptionViewModel[]) =>
          (this.propertyOptions = [
            ...this._manipulatePropertyOptions(properties),
          ]),
        error: () =>
          this._loadingService.stopLoading(
            'read',
            'categoryFilterPropertyOptions'
          ),
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

  public manageSelectedArray(selectedItem: SelectablePropertyModel): void {
    const item = new SelectedFilterModel(
      selectedItem.option.seoTitle,
      selectedItem.option.title,
      selectedItem.title
    );
    selectedItem.selected
      ? this.addToFilterList(item)
      : this.removeFromFilterList(item.key);
    this.navigateWithNewParams();
  }

  public onSelectSort(sort: ProductSortTypeEnum) {
    sort === 0
      ? this.removeFromFilterList('sortBy')
      : this.addToFilterList(new SelectedFilterModel('sortBy', '', sort));

    this.navigateWithNewParams();
  }

  public navigateWithNewParams(queryParams?: Params) {
    let query: Params = {};
    if (queryParams) query = { ...queryParams };

    this.filterList.forEach((filter) => {
      query[filter.key] = filter.value;
    });

    this._routeHandlerService.updateQueryParams(
      this._queryParamsService.sortQuryParams(query)
    );
  }

  public determineSelectedArray(propertyOption: SelectableOption) {
    let selectedItem!: SelectablePropertyModel;
    const value = this.queryParams[propertyOption.seoTitle];
    const index = this._indexOfProperty(value, propertyOption.options);
    if (index != -1) {
      const filterItem = propertyOption.options[index];
      filterItem.selected = true;
      this.addToFilterList(
        new SelectedFilterModel(
          propertyOption.seoTitle,
          propertyOption.title,
          value
        )
      );
      selectedItem = filterItem;
    }
    return selectedItem;
  }

  public findProperty(
    item: SelectedFilterModel
  ): SelectablePropertyModel | undefined {
    const propertyOption = this.propertyOptions.find(
      (x) => x.seoTitle == item.key
    );

    if (propertyOption) {
      return propertyOption.options.find(
        (x) => x.title === item.value
      ) as SelectablePropertyModel;
    }
    return undefined;
  }

  private _indexOfProperty(
    param: string,
    properties: SelectablePropertyModel[]
  ) {
    return properties.findIndex((property) => property.title === param);
  }

  public filterSelectedFilters(key: string) {
    this.filterList = this.filterList.filter((x) => x.key !== key);
  }
  public removeFromFilterList(key: string) {
    this.filterSelectedFilters(key);
  }
  public addToFilterList(...selectedItems: SelectedFilterModel[]) {
    selectedItems.forEach((selectedItem) => {
      this.filterSelectedFilters(selectedItem.key);
    });
    this.filterList.push(...selectedItems);
  }

  public addPriceFilter(priceRange: PriceRange) {
    this.addToFilterList(
      new SelectedFilterModel(
        'priceFrom',
        'از',
        priceRange.min ? priceRange.min : '0'
      ),
      new SelectedFilterModel('priceTo', 'تا', priceRange.max!)
    );
    this.navigateWithNewParams();
  }

  public removePriceFilter() {
    this.resetPrice();
    this.filterList = this.filterList.filter(
      (x) => x.key != 'priceTo' && x.key != 'priceFrom'
    );

    this.navigateWithNewParams();
  }

  get canResetPrice() {
    return (
      this.filterList.findIndex(
        (x) => x.key === 'priceFrom' || x.key === 'priceTo'
      ) != -1
    );
  }

  public resetPrice() {
    this.priceSliderReset = true;
  }

  public resetSearch() {
    this.removeFromFilterList('q');
    this.navigateWithNewParams();
  }

  public removeAll() {
    this.filterList.forEach((item) => {
      let selectedItem = this.findProperty(item);
      if (selectedItem) selectedItem.selected = false;
    });
    this.filterList = this._initNewFilterList();
    this.navigateWithNewParams();
    this.resetPrice();
    this.resetFilter$.next();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
