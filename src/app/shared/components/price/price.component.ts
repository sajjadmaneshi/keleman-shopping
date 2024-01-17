import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'keleman-price',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, LoaderComponent],
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
})
export class PriceComponent {
  @Input() value: number = 0;
  @Input() color:
    | 'primary'
    | 'dark'
    | 'secondary'
    | 'light'
    | 'danger'
    | 'success'
    | 'warning' = 'primary';
  @Input() append: string = 'تومان';
  @Input() size: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h4';
  @Input() off = false;
  @Input() discount = 0;
  @Input() loading = false;
}
