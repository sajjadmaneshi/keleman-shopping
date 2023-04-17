import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

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

  @Input() min: number = 0;
  @Input() max: number = 100000000;
  @Input() reset: boolean = false;

  @Output('changePrice') change = new EventEmitter<PriceRange>();
  @Output('afterReset') afterReset = new EventEmitter();

  minValue: number = 0;
  maxValue: number = 100000000;

  ngOnInit(): void {
    this.minValue = this.min;

    this.maxValue = this.max;
  }
  formatLabel(value: number): string {
    if (value >= 1000 && value < 1000000) {
      return Math.round(value / 1000) + 'هزار';
    }
    if (value >= 1000000) {
      return Math.round(value / 1000000) + 'میلیون';
    }

    return `${value}`;
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
      this.max = 100000000;
      this.maxValue = 100000000;
      this.afterReset.emit();
    }
  }
}

export interface PriceRange {
  min: number;
  max: number;
}
