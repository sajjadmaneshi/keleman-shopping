import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LazyLoadingDirective } from '../../../../../../shared/directives/lazy-loading.directive';
import { EmptyImageDirective } from '../../../../../../shared/directives/empty-image.directive';
import { MatIconModule } from '@angular/material/icon';
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem,
  NgbTooltip,
} from '@ng-bootstrap/ng-bootstrap';
import { OrderCanReturnViewModel } from '../../../data/view-models/order-CanReturn.view-model';
import { PersianDateTimeService } from '../../../../../../shared/services/date-time/persian-datetime.service';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { SnackBarService } from '../../../../../../shared/components/snack-bar/snack-bar.service';

@Component({
  selector: 'keleman-order-can-return-item',
  standalone: true,
  imports: [
    LazyLoadingDirective,
    EmptyImageDirective,
    MatIconModule,
    NgbTooltip,
    NgbAccordionBody,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionDirective,
    NgbAccordionHeader,
    NgbAccordionItem,
    MatListModule,
    MatCheckboxModule,
    FormsModule,
  ],
  templateUrl: './order-can-return-item.component.html',
  styleUrl: './order-can-return-item.component.scss',
})
export class OrderCanReturnItemComponent {
  @Input() order!: OrderCanReturnViewModel;

  @Output('addTo') addToReturnOrderList =
    new EventEmitter<OrderCanReturnViewModel>();
  checked = false;

  constructor(
    public persianDateTimeService: PersianDateTimeService,
    private _snackBarService: SnackBarService
  ) {}

  addToReturnList() {
    const selectedProducts = this.order.products.filter((x) => x.selected);
    if (selectedProducts.length === 0) {
      this._snackBarService.showDangerSnackBar(
        'لطفا حداقل یک محصول را جهت مرجوعی انتخاب نمایید'
      );
    } else {
      const returnOrder = {
        ...this.order,
        products: selectedProducts,
      } as OrderCanReturnViewModel;
      this.addToReturnOrderList.emit(returnOrder);
    }
  }
}
