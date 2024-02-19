import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { RouterLink } from '@angular/router';
import { ProductDetailViewModel } from '../../../data/models/view-models/product-detail.view-model';
import { LazyLoadingDirective } from '../../../../../../shared/directives/lazy-loading.directive';
import { EmptyImageDirective } from '../../../../../../shared/directives/empty-image.directive';

@Component({
  selector: 'keleman-go-to-basket-base',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterLink,
    LazyLoadingDirective,
    EmptyImageDirective,
  ],
  templateUrl: './go-to-basket-base.component.html',
  styleUrl: './go-to-basket-base.component.scss',
})
export class GoToBasketBaseComponent {
  @Input('productDetails') productDetails!: ProductDetailViewModel;
  @Output() close = new EventEmitter();

  onClose() {
    this.close.emit();
  }
}
