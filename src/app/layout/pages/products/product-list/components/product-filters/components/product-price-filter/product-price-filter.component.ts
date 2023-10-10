import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ProductFilterService } from '../../../product-filter.service';

@Component({
  selector: 'keleman-product-price-filter',
  templateUrl: './product-price-filter.component.html',
  styleUrls: ['./product-price-filter.component.scss'],
})
export class ProductPriceFilterComponent implements OnInit, OnChanges {
  @ViewChild('minInput')
  minInput!: HTMLInputElement;
  @ViewChild('maxInput')
  maxInput!: HTMLInputElement;

  formattedMinValue!: string;
  formattedMaxValue!: string;

  @Input() min: number = 0;
  @Input() max: number = 100000000;
  @Input() reset: boolean = false;

  @Output('changePrice') change = new EventEmitter<PriceRange>();
  @Output('afterReset') afterReset = new EventEmitter();

  minValue: number = 0;
  maxValue: number = 100000000;

  constructor(public productFilterService: ProductFilterService) {}

  ngOnInit(): void {
    const queryParams = this.productFilterService.queryParams;
    const priceFrom = queryParams['priceFrom'];
    const priceTo = queryParams['priceTo'];

    if (priceFrom && priceTo) {
      this.minValue = priceFrom;
      this.maxValue = priceTo;
      this.productFilterService.addPriceFilter({
        min: priceFrom,
        max: priceTo,
      });
    } else {
      this.minValue = this.min;
      this.maxValue = this.max;
    }
    this.formatInputValues();
  }
  formatLabel(value: number): string {
    if (value >= 1000000) {
      return Math.round(value / 1000000) + ' میلیون';
    } else if (value >= 1000) {
      return Math.round(value / 1000) + ' هزار';
    } else {
      return `${value}`;
    }
  }

  changePrice() {
    const priceRange: PriceRange = {
      min: this.minValue,
      max: this.maxValue,
    };
    this.change.emit(priceRange);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.reset) {
      this.min = 0;
      this.minValue = 0;
      this.maxValue = this.max;
      this.afterReset.emit();
    }
  }
  formatInputValues() {
    this.formattedMinValue = this.minValue.toLocaleString('en-US');
    this.formattedMaxValue = this.maxValue.toLocaleString('en-US');
  }
}

export interface PriceRange {
  min: number;
  max: number;
}
