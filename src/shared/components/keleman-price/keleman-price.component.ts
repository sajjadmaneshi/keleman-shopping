import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'keleman-price',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './keleman-price.component.html',
  styleUrls: ['./keleman-price.component.scss'],
})
export class KelemanPriceComponent {
  @Input() value: number = 0;
  @Input() color: 'primary' | 'dark' | 'secondary' | 'light' | 'danger' =
    'primary';
  @Input() icon: string = 'assets/media/icons/toman-icon/toman-icon-lg.png';
  @Input() size: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h4';
  @Input() off = false;
}
