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
import { ProductFilterService } from '../../../../../services/product-filter.service';
import { debounce, debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'keleman-product-price-filter',
  templateUrl: './product-price-filter.component.html',
  styleUrls: ['./product-price-filter.component.scss'],
})
export class ProductPriceFilterComponent implements OnInit, OnChanges {
  formattedMinValue!: string;
  formattedMaxValue!: string;
  dataReceived = false;

  private _max: number = 0;

  @Input('max')
  set max(value: number) {
    this._max = value;
  }

  get max(): number {
    return this._max;
  }

  @Input() reset: boolean = false;

  @Output('changePrice') change = new EventEmitter<PriceRange>();
  @Output('afterReset') afterReset = new EventEmitter();
  private minValueSubject = new Subject<number>();
  private maxValueSubject = new Subject<number>();

  minValue: number = 0;
  maxValue: number = 250000000;

  constructor(public productFilterService: ProductFilterService) {}

  ngOnInit(): void {
    this._priceInputChangeDetection();
    this._detectValueFromRoute();
  }

  private _detectValueFromRoute() {
    this.maxValue = this.max;
    const queryParams = this.productFilterService.queryParams;
    const priceFrom = queryParams['priceFrom'];
    const priceTo = queryParams['priceTo'];
    if (priceFrom && priceTo) {
      this.minValue = +priceFrom;
      this.maxValue = +priceTo;
      this.productFilterService.addPriceFilter({
        min: priceFrom,
        max: priceTo,
      });
    }
  }

  private _priceInputChangeDetection() {
    this.maxValueSubject.pipe(debounceTime(1000)).subscribe((max: number) => {
      this.maxValue = max;
      this.changePrice();
    });
    this.minValueSubject.pipe(debounceTime(1000)).subscribe((min: number) => {
      this.minValue = min;
      this.changePrice();
    });
  }

  formatLabel(value: number): string {
    if (value >= 1000 && value < 1000000)
      return Math.round(value / 1000) + 'هزار';
    if (value >= 1000000) return Math.round(value / 1000000) + 'میلیون';
    return `${value}`;
  }

  changePrice() {
    const priceRange: PriceRange = {
      min: this.minValue.toString(),
      max: this.maxValue.toString(),
    };
    this.change.emit(priceRange);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.reset) {
      this.minValue = 0;
      this.maxValue = this.max;
      this.afterReset.emit();
    }
  }

  onInputMin($event: string) {
    this.minValueSubject.next($event === '' ? 0 : this._fixPrice(+$event));
  }
  onInputMax($event: string) {
    this.maxValueSubject.next($event === '' ? 0 : this._fixPrice(+$event));
  }

  private _fixPrice(value: number): number {
    return value > this.max ? this.max : value;
  }
}

export class PriceRange {
  constructor(public min?: string, public max?: string) {}
}
