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
import { ApplicationStateService } from '../../../../../../shared/services/application-state.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProductSortTypeEnum } from '../../../data/enums/product-sort-type .enum';

@Component({
  selector: 'keleman-products-sort',
  templateUrl: './products-sort.component.html',
  styleUrls: ['./products-sort.component.scss'],
})
export class ProductsSortComponent implements OnChanges {
  @Input() initialSort!: ProductSortTypeEnum;
  @Output() selectionChange = new EventEmitter<ProductSortTypeEnum>();
  selectedSortValue: ProductSortTypeEnum = 0;

  sortEnum = ProductSortTypeEnum;

  sortItems = [
    { title: 'پرفروش ترین', value: ProductSortTypeEnum.TopSelling },
    { title: 'تخفیف دار', value: ProductSortTypeEnum.Discounted },
    { title: 'ارزان ترین', value: ProductSortTypeEnum.LowPrice },
    { title: 'گرانترین', value: ProductSortTypeEnum.HighPrice },
  ];

  constructor(
    public applicationState: ApplicationStateService,
    private _bottomSheet: MatBottomSheet
  ) {}

  openBottomSheet(element: TemplateRef<any>) {
    this._bottomSheet.open(element);
  }
  onSelectSort(value: ProductSortTypeEnum) {
    this.selectedSortValue = value;
    this.selectionChange.emit(value);
  }
  closeBottomSheet() {
    this._bottomSheet.dismiss();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['initialSort'].previousValue !=
      changes['initialSort'].currentValue
    )
      this.selectedSortValue = this.initialSort;
  }
}
