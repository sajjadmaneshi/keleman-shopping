import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { GoToBasketBaseComponent } from '../go-to-basket-base/go-to-basket-base.component';
import { ProductDetailViewModel } from '../../../data/models/view-models/product-detail.view-model';
import { BottomSheetComponent } from '../../../../../../shared/components/bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'keleman-go-to-basket-bottom-sheet',
  standalone: true,
  imports: [
    MatDividerModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    GoToBasketBaseComponent,
    BottomSheetComponent,
  ],
  templateUrl: './go-to-basket-bottom-sheet.component.html',
  styleUrl: './go-to-basket-bottom-sheet.component.scss',
})
export class GoToBasketBottomSheetComponent {
  @Input('productDetails') productDetails!: ProductDetailViewModel;
  @Output() close = new EventEmitter();

  onClose() {
    this.close.emit();
  }
}
