import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmptyImageDirective } from '../../../../../../../shared/directives/empty-image.directive';
import { LazyLoadingDirective } from '../../../../../../../shared/directives/lazy-loading.directive';
import { MatDividerModule } from '@angular/material/divider';
import { ValueChangerComponent } from '../../../../../../../shared/components/value-changer/value-changer.component';
import { ReturnOrderProductViewModel } from '../../../../data/view-models/order-CanReturn.view-model';

@Component({
  selector: 'keleman-return-order-product',
  standalone: true,
  imports: [
    EmptyImageDirective,
    LazyLoadingDirective,
    MatDividerModule,
    ValueChangerComponent,
  ],
  templateUrl: './return-order-product.component.html',
  styleUrl: './return-order-product.component.scss',
})
export class ReturnOrderProductComponent implements OnInit {
  @Input() product!: ReturnOrderProductViewModel;
  @Output() amountChange = new EventEmitter<number>();

  max!: number;

  ngOnInit(): void {
    if (this.product) {
      this.max = this.product.amount;
    }
  }
  onAmountChange(amount: number) {
    this.amountChange.emit(amount);
  }
}
