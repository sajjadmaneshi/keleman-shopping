import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'keleman-product-price-filter',
  templateUrl: './product-price-filter.component.html',
  styleUrls: ['./product-price-filter.component.scss'],
})
export class ProductPriceFilterComponent implements OnInit {
  @ViewChild('minInput')
  minInput!: HTMLInputElement;
  @ViewChild('maxInput')
  maxInput!: HTMLInputElement;

  @Input() min: number = 0;
  @Input() max: number = 100000000;

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
}
