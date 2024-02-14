import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BottomSheetComponent } from '../../../../../../../shared/components/bottom-sheet/bottom-sheet.component';
import { EmptyImageDirective } from '../../../../../../../shared/directives/empty-image.directive';
import { LazyLoadingDirective } from '../../../../../../../shared/directives/lazy-loading.directive';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ProductDetailViewModel } from '../../../../data/models/view-models/product-detail.view-model';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { GoToBasketBaseComponent } from '../go-to-basket-base/go-to-basket-base.component';

@Component({
  selector: 'keleman-go-to-basket-bottom-sheet',
  standalone: true,
  imports: [
    BottomSheetComponent,
    EmptyImageDirective,
    LazyLoadingDirective,
    MatDividerModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    GoToBasketBaseComponent,
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
