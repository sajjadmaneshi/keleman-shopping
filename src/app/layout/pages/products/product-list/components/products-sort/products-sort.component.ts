import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { ProductSortTypeEnum } from '../../../data/enums/product-sort-type .enum';
import { ProductFilterService } from '../../../services/product-filter.service';

@Component({
  selector: 'keleman-products-sort',
  templateUrl: './products-sort.component.html',
  styleUrls: ['./products-sort.component.scss'],
})
export class ProductsSortComponent implements OnChanges {
  @Input() initialSort!: ProductSortTypeEnum;

  selectedSortValue: ProductSortTypeEnum = 0;

  sortEnum = ProductSortTypeEnum;

  constructor(public productFilterService: ProductFilterService) {}

  selectSort(sortItem: ProductSortTypeEnum) {
    this.selectedSortValue = sortItem;
    this.productFilterService.onSelectSort(sortItem);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['initialSort'].previousValue !=
      changes['initialSort'].currentValue
    )
      this.selectedSortValue = this.initialSort;
  }
}
